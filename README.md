# What is This?

A copy of a mobile React Native based component library, ideally with Expo.


## Installing

To use Flask mobile components, you may want to install the root package
`@lucksp/mobile` instead of specific packages since it will reduce your
dependency list.

## To Develop

- To start clean, `yarn clean` && `yarn boot`.
- The `packages/mobile` folder is the root of the exported packages.

### To view your changes

Most of our packages are standalone so there is no environment. You will need to
`yarn link` your packages: `cd/yourPackage` and then `yarn link`.

You may have to symlink to view your working component changes inside an Expo app.

### To make a commit, must use a Semantic syntax

- prefix: `feat` | `fix` | `docs` | `test` | `chore` | `style`
- so your commit message would look like: `docs: update readme`

Read more
[here](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)


## To Publish

After all your commits (git commit chore: whatever), and your branch is merged
into `main`:

- Switch to the main branch and run `yarn release`. The `yarn release` command
  will bump dependency versions in all the packages that reference each other,
  too. So we don't have to do that manually, which is nice.

#### Note

> We are not using a `develop` branch, only `main`. This is because we want to
> treat each PR as "release". We don’t need to release on every merge to master,
> especially for chores.

## Usage

Please refer to the specific package for usage, API details, examples, &
installation.


## Contributing

Feel like contributing? Cool! We have a [contributing guide](./CONTRIBUTING.md)
to help guide you.
