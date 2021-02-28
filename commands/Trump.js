import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Trump extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Trump, {
      category: category,

      name: 'heavens door trump',
      aliases: [],
      description: 'Trump likes your image',
      usage: 'heavens door trump [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door trump'
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

  async modifyImage() {
    const trump = this.modules.heavensdoor.getAssetPath('trump.png')
    const metadata = await this.sharp(trump).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 208, y: 268 },
        tR: { x: 548, y: 271 },
        bL: { x: 139, y: 450 },
        bR: { x: 558, y: 450 }
      }
    )

    return this.sharp(trump)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
