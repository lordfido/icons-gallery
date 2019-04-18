# Icons Gallery

This gallery has been created in order to display any SVG icons gallery.

In order to keep it open, no icons will be integrated on this tool, in fact, they will be stored in a separated
repository, so you'll be able to update your gallery without touching the code of this tool.

- [Requirements](#requirements)
  - [Enviroment variables](#enviroment-variables)
  - [Icons repository](#icons-repository)
- [Usage](#usage)

Check the [Features](./docs/features.md) in order to discover what you can do with this gallery, or
[How it works](./docs/how-it-works.md) to learn how our engine works and improve your gallery system.

## Requirements

### Enviroment variables

You'll need to setup some Enviroment variables in order to specify the repository where you have your icons and your git
credentials.

These are required variables:

```bash
REPO_PASSPHRASE=whatever # The passphrase you used to encrypt your ssh key
REPO_PRIVATE_PATH=path/to/your/private/ssh/key
REPO_PUBLIC_PATH=path/to/your/public/ssh/key
REPO_URL=git@your.repo.com:project/url.git
```

If you want a simple way to do this, you can simply create a `.env` file in the root of this proyect with specified
variables, and it should work.

### Icons repository

In order to make this gallery work with your repository, it's expected that your icons repository has some folders on
its root path.

Each one of these folders will represent a brand and should be named as the name of the brand, and inside of it, you can
place your SVG icons with any jierarchy you want to use.

If you decide to use subfolders in a brand's folder, each of this folders will be used as a tag for icons in it, so you
can search by tag and filter your icon list.

_\*Note: If you only have one single brand, just place one single folder in your root_

## Usage

Once you've setup all requirements for this to work, you just need to execute this, in order to have a production build,
ready to be served in your webserver:

```
yarn build
```

If you wan't a development version, you can run the following command, and you'll create an 'in-memory' version of the
app, so you can work faster.

```
yarn start
```
