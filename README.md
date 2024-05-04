# Need volunteers who can help boatmen

## Booknaav Frontend

## Workflow

In order to make any changes to this project you’ll need to follow a few steps:

1. Create a ticket in the ToDo column on [FE Board](https://github.com/orgs/Booknav/projects/1/views/3).
2. Convert that ticket to an issue.
3. Add the description in the issue accordingly.
4. Create a branch for that issue. (See branch naming conventions)
5. Once you are done with your work raise a PR. (Don’t forget to add Reviewer*, Project*, Assignees, Milestones)
6. Link your newly created PR with your issue.
7. Once PR is merged, Your issue will move from `In-Review` to `End-To-End-Testing` on the [FE Board](https://github.com/orgs/Booknav/projects/1/views/3).
8. Make sure that the functionality that is implemented works perfectly on the [Staging environment](https://localhost:3000/).

## <a name=“commit-header”></a>Commit Message Header (Defined by angular)

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: The module name
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

##### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

##### Scope

The scope should be the name of the module affected (as perceived by the person reading the changelog generated from commit messages).
