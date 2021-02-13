import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Saxton extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Saxton, {
      category: category,

      name: 'heavens door saxton',
      aliases: [],
      description: "Provided image is Saxton's",
      usage: 'heavens door saxton [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door saxton'
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
    const saxton = this.modules.heavensdoor.getAssetPath('saxton.png')
    const metadata = await this.sharp(saxton).metadata()
    const perspective = await this.modules.heavensdoor.generatePerspective(
      this.filename,
      {
        width: metadata.width,
        height: metadata.height
      },
      {
        tL: { x: 230, y: 200 },
        tR: { x: 563, y: 219 },
        bL: { x: 201, y: 388 },
        bR: { x: 545, y: 422 }
      }
    )
    return this.sharp(saxton).composite([
      { input: perspective, left: 0, top: 0, blend: 'dest-over' }
    ])
  }
}
