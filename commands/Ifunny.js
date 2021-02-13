import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class iFunny extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(iFunny, {
      category: category,

      name: 'heavens door ifunny',
      aliases: [],
      description: 'Adds the ifunny watermark to a picture',
      usage: 'heavens door ifunny [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door ifunny'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.textChannel.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.textChannel.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  async modifyImage() {
    const ifunnyWatermark = await this.sharp(
      this.modules.heavensdoor.getAssetPath('ifunnywatermark.png')
    )
      .resize({ width: 512 })
      .toBuffer()
    return this.sharp(this.filename)
      .resize({ height: 512, width: 512 })
      .extend({
        top: 0,
        left: 0,
        right: 0,
        bottom: 20,
        background: 'transparent'
      })
      .composite([{ input: ifunnyWatermark, gravity: 'south' }])
  }
}
