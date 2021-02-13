import HeavensDoor from '../../structures/commands/HeavensDoor.js'

export default class JotaroShows extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(JotaroShows, {
      category: category,

      name: 'heavens door shows',
      aliases: [],
      description: 'Jotaro shows an image',
      usage: 'heavens door jotaro shows [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door jotaro shows'
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
    const jotaro = this.modules.heavensdoor.getAssetPath('jotaro2.png')
    const metadata = await this.sharp(jotaro).metadata()

    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 118, y: 231 },
        tR: { x: 361, y: 198 },
        bL: { x: 140, y: 400 },
        bR: { x: 375, y: 372 }
      }
    )
    return this.sharp(jotaro)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
