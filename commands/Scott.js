import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Scott extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Scott, {
      category: category,

      name: 'heavens door scott',
      aliases: [],
      description: 'Scott shows your image',
      usage: 'heavens door scott [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door scott'
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
    const scott = this.modules.heavensdoor.getAssetPath('scott.png')
    const metadata = await this.sharp(scott).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 129, y: 186 },
        tR: { x: 517, y: 182 },
        bL: { x: 132, y: 418 },
        bR: { x: 515, y: 464 }
      }
    )
    return this.sharp(scott)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
