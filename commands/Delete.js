import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Delete extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Delete, {
      category: category,

      name: 'heavens door delete',
      aliases: ['delete', 'remove'],
      description: 'Deletes an image',
      usage: 'heavens door delete [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      examples: ['heavens door delete']
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({
        width: 145,
        height: 87,
        fit: 'contain',
        position: 'center',
        background: '#3D3D3D'
      })
      .extend({
        top: 109,
        bottom: 45,
        left: 105,
        right: 233,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('delete.png'),
          gravity: 'south'
        }
      ])
      .png()
  }
}
