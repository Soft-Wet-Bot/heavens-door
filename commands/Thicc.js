import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Thicc extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Thicc, {
      category: category,

      name: 'heavens door thicc',
      aliases: ['thick', 'mirror'],
      description: 'Provided image is thicc',
      usage: 'heavens door thicc [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door thicc'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run() {
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
    const thicc = this.modules.heavensdoor.getAssetPath('thicc.png')
    const metadata = await this.sharp(thicc).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 304, y: 249 },
        tR: { x: 428, y: 243 },
        bL: { x: 302, y: 587 },
        bR: { x: 430, y: 598 }
      }
    )
    return this.sharp(thicc)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
