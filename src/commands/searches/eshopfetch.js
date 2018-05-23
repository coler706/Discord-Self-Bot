/*
 *   This file is part of ribbon
 *   Copyright (C) 2017-2018 Favna
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// TODO: Look into not printing error messages to public chat as sensitive data could be there(PM instead?)
const {Command} = require('discord.js-commando'),
  eshop = require('nintendo-switch-eshop'),
  fs = require('fs'),
  path = require('path'),
  {deleteCommandMessages} = require('../../util.js');

module.exports = class EshopFetchCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'eshopfetch',
      memberName: 'eshopfetch',
      group: 'searches',
      aliases: ['efetch'],
      description: 'Fetches latest games list from the Nintendo Switch eShop',
      examples: ['eshopfetch'],
      guildOnly: false,
      ownerOnly: true
    });
  }

  async run (msg) {
    msg.edit('\`fetching, please wait...\`');
    fs.writeFileSync(path.join(__dirname, '../../data/databases/eshop.json'), JSON.stringify(await eshop.getGamesAmerica()), 'utf8');

    if (fs.existsSync(path.join(__dirname, '../../data/databases/eshop.json'))) {
      deleteCommandMessages(msg, this.client);

      return msg.reply('Latest eshop data stored in file');
    }

    return msg.reply('An error occurred fetching latest data!');
  }
};