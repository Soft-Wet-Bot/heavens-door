import HeavensDoor from '../../structures/commands/HeavensDoor.js'

export default class JotaroLoves extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(JotaroLoves, {
      category: category,

      name: 'heavens door loves',
      aliases: [],
      description: 'Jotaro loves an image',
      usage: 'heavens door jotaro loves [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door jotaro loves'
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
    const jotaro = this.modules.heavensdoor.getAssetPath('jotarolove.png')
    const metadata = await this.sharp(jotaro).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 124, y: 48 },
        tR: { x: 322, y: 12 },
        bL: { x: 169, y: 259 },
        bR: { x: 343, y: 201 }
      }
    )
    return this.sharp(jotaro)
      .composite([{ input: perspective, left: 0, top: 0, blend: 'dest-over' }])
      .toBuffer()
  }
}
