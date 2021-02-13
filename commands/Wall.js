import HeavensDoor from '../structures/commands/HeavensDoor.js'
import tempy from 'tempy'

export default class Wall extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Wall, {
      category: category,

      name: 'heavens door wall',
      aliases: [],
      description: 'Makes a wall of an image',
      usage: 'heavens door wall [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door wall'
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
      const imageResized = tempy.file({ extension: 'png' })

      this.gm(this.filename)
        .resize(256)
        .strip()
        .write(imageResized, (error) => {
          if (error) return reject(new Error(error))

          this.gm(imageResized)
            .virtualPixel('tile')
            .matteColor('none')
            .out('-background', 'none')
            .resize('512x512!')
            .out('-distort')
            .out('Perspective')
            .out('0,0,60,45 0,256,65,135 256,0,145,65 256,256,145,145')
            .strip()
            .stream((error, stdout) => {
              if (error) return reject(new Error(error))

              resolve(stdout)
            })
        })
    })
  }
}
