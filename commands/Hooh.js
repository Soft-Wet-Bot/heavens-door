import HeavensDoor from '../structures/commands/HeavensDoor.js'
import tempy from 'tempy'

export default class Hooh extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Hooh, {
      category: category,

      name: 'heavens door hooh',
      aliases: [],
      description: 'Hoohs an image',
      usage: 'heavens door flop [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door hooh'
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
      const haahCrop = [
        tempy.file({ extension: 'png' }),
        tempy.file({ extension: 'png' })
      ]

      this.gm(this.filename)
        .gravity('South')
        .crop('50%', 0)
        .strip()
        .write(haahCrop[0], (error) => {
          if (error) return reject(new Error(error))

          this.gm(haahCrop[0])
            .flop()
            .strip()
            .write(haahCrop[1], (error) => {
              if (error) return reject(new Error(error))

              this.gm(haahCrop[0])
                .append(haahCrop[1], true)
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
