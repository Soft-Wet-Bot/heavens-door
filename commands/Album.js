import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Album extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Album, {
      category: category,

      name: 'heavens door album',
      aliases: ['trump5'],
      description: "Provided image is Trump's favourite album",
      usage: 'heavens door album [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door album'
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
        'Unknown error occured, notify the creator of the bot if this persists:```js\n' +
        e.stack +
        '```'
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 365, height: 317, fit: 'fill', position: 'center' })
      .extend({
        top: 610,
        bottom: 0,
        left: 162,
        right: 223,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('album.png'),
          gravity: 'south'
        }
      ])
  }
}
