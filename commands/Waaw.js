import HeavensDoor from '../structures/commands/HeavensDoor.js'
import tempy from 'tempy'

export default class Waaw extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Waaw, {
      category: category,

      name: 'heavens door waaw',
      aliases: [],
      description: 'Waaws an image',
      usage: 'heavens door waaw [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      examples: ['heavens door waaw']
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
      const waawCrop = [
        tempy.file({ extension: 'png' }),
        tempy.file({ extension: 'png' })
      ]

      this.gm(this.filename)
        .gravity('East')
        .crop('50%', 0)
        .strip()
        .write(waawCrop[0], (error) => {
          if (error) return reject(new Error(error))

          this.gm(waawCrop[0])
            .flop()
            .strip()
            .write(waawCrop[1], (error) => {
              if (error) return reject(new Error(error))

              this.gm(waawCrop[0])
                .append(waawCrop[1], true)
                .strip()
                .stream((error, stdout) => {
                  if (error) return reject(new Error(error))

                  resolve(stdout)
                })
            })
        })
    })
  }
}
