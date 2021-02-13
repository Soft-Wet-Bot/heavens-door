import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Tile extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Tile, {
      category: category,

      name: 'heavens door tile',
      aliases: [],
      description: 'Makes a tile of an image',
      usage: 'heavens door tile [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door tile'
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
    return new Promise((resolve, reject) => {
      this.gm(this.filename)
        .coalesce()
        .command('montage')
        .out('-duplicate')
        .out(24)
        .tile('4x4')
        .geometry('+0+0')
        .stream((error, stdout) => {
          if (error) return reject(new Error(error))

          resolve(stdout)
        })
    })
  }
}
