var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }  
  async prompting() {
      this.answers = await this.prompt([
        {
          type: "input",
          name: "title",
          message: "You Project title"
        }
      ]);
    }
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.title }
    );
  }
  // async prompting() {
  //   this.dependency = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Would you like to enable the Cool feature?"
  //     }
  //   ]);
  // }
  // writing() {
  //   const pkgJson = {
  //     dependencies: {
  //       [this.dependency.name]: '*'
  //     }
  //   };

  //   // Extend or create package.json file in destination path
  //   this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  // }

  // install() {
  //   this.npmInstall();
  // }
}