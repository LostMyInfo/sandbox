// require('dotenv').configure()
const { isEmpty } = require("ramda");
const { arrDiff } = require("./utilities/functions");
const { log, objectDifference } = require('./utilities/functions');

const guild_id = '12345';
const channel_id = '29628';
const author = { id: '56843' };

(async() => {
  try {
    
    const db = new (require('quick.db')).QuickDB();
    const guildDB = db.table('codeSB_guilds');
    // return console.log((await guildDB.deleteAll()))
    // return console.log((await guildDB.all()))
    
    const api = new (require('mapih'))();

    // return log('difference', objectDifference(mems1, mems2))
    const guilds = await api.discord.users.myGuilds(),
      currentTime = Date.now(),
      data = {};
    
    for (const guild of guilds) {
      const guildObj = await guildDB.get(guild.id);
      // console.log(guildObj)
      
      if (!guildObj) {
        
        log('new guildObj', guildObj);
        // const newGuild = guild
        
        const newGuild = await api.discord.guilds.retrieve({
          guild_id: guild.id,
          with_counts: true
        });
        
        const newRoles = newGuild.roles.reduce((acc, { id, name }) => ({
          ...acc, [id]: name
        }), {});
    
        let newMembers = (await api.discord.guilds.members.getAll({
          guild_id: guild.id,
          limit: 1000,
        }))
        
        await guildDB.set(`${guild.id}_members`, newMembers);
        await guildDB.set(`${guild.id}_roles`, newGuild.roles);

        newMembers = newMembers.filter(x => !x.user.bot).map(x => ({
          id: x.user.id,
          username: x.user.username,
          displayName: x.displayName,
          displayAvatar: x.displayAvatar,
          joined_at: x.joined_at,
          roles: x.roles
            .map(role => role)
            .filter(roleId => Object.keys(newRoles).includes(roleId))
            .reduce((obj, roleId) => ({
              ...obj, [newRoles[roleId]]: roleId
            }), {}),
          lastUpdate: currentTime
        }));
        // return console.log(newMembers[5].roles)
        
        await guildDB.set(guild.id, {
          id: newGuild.id,
          name: newGuild.name,
          approx: newGuild.approximate_member_count,
          members: newMembers,
          roles: newRoles,
        });
    
      } else if (currentTime - (guildObj.lastUpdate || 0) >= 604800000) {
        
        const newGuild = await api.discord.guilds.retrieve({
          guild_id: guild.id,
          with_counts: true
        });
        
        const newRoles = newGuild.roles.reduce((acc, { id, name }) => ({
          ...acc, [id]: name
        }), {});

        if (guildObj.approx !== newGuild.approximate_member_count) {

          let newmembers = (await api.discord.guilds.members.getAll({
            guild_id: guild.id,
            limit: 1000,
          }))

          const oldmembers = await guildDB.get(`${guild.id}_members`);
          const diffMembers = arrDiff(oldmembers, newmembers, 'user.id');
          if (!isEmpty(diffMembers)) console.log('diffMembers', diffMembers);

          await guildDB.set(`${guild.id}_members`, newmembers);

          newmembers = newmembers.filter(x => !x.user.bot).map(x => ({
            id: x.user.id,
            username: x.user.username,
            displayName: x.displayName,
            displayAvatar: x.displayAvatar,
            joined_at: x.joined_at,
            roles: x.roles
              .map(role => role)
              .filter(roleId => Object.keys(newRoles).includes(roleId))
              .reduce((obj, roleId) => ({
                ...obj, [newRoles[roleId]]: roleId
              }), {}),
            lastUpdate: currentTime
          }));
          
          await guildDB.set(`${guild.id}.members`, newmembers);

          // update guildObj.members
          // find unique
          // update
        }
    
        if (guildObj.roles?.length !== newGuild.roles?.length) {
          const oldroles = await guildDB.get(`${guild.id}_roles`);
          // console.log('oldroles', oldroles);
          const diffRoles = arrDiff(oldroles, newGuild.roles, 'id');
          if (!isEmpty(diffRoles)) console.log('diffRoles', diffRoles);

          await guildDB.set(`${guild.id}_roles`, newGuild.roles);

          // find unique
          // update
        }
        
        await guildDB.set(`${guild.id}.lastUpdate`, currentTime);
      }
      // console.log('\nFINAL GUILD OBJECT\n', await guildDB.get(guild.id));
      /* unneeded?
      data[guild.id] = {
        name: guild.name,
        // members: 
      }
      */
    }

  } catch (e) {
    console.log(e)
  }
})();

