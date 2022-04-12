# Contributing to the project

When contributing to the project, it's important that we stick to the same rules when writing code - this makes it easier to extend functionality you haven't previously worked with since the code will be more readable.

_At the moment, this is a first draft, and I would love for you to extend on this if you feel like something is unclear._

## Communication

All communication will be handled via the Discord, so just write there if any questions arise! The same goes for general discussion.

## File and folder names

My suggestion is based on simplicity, since it tends to differ from project to project regarding naming files - the key is consistency.

- **React components** should use PascalCase. `ComponentName.tsx`.
- **ALL OTHER TypeSript files** should use kebab-case. `foo-bar.ts`.
- **Folders** should be snake_case. `my_folder`.
- **CSS files** should be kebab-case (keep names short here). `my-stylesheet.css`.

## Committing and pushing (git stuff)

- Make atomic commits (one commit per feature/fix)
- Use the following format for commit messages: `Category: brief description of what is added/changed`.
- Write the commit message in the imperative mood: `Model: add graph translator`.
- Avoid using words like `fix` or `refactor` if possible. However, this is sometimes very annoying, so no blame if you do.
- **Questions?** write in Discord :^)

## Using branches and pull requests (PRs)

We always want the main branch to be runnable. Therefore, we use branches when developing the application. Keep it small when writing functionality (if applicable - one branch per user story).

**ALSO:** touch as few files as possible when writing code, and don't change code if you can avoid it. _Open for extension, closed for modification._ 💚

**When you're done with your code, and deem it ready for the main branch:**

- Check formatting! Run prettier on your code (preferably before each commit)
- Check that it follows this document!
- Have you written tests? If not, do so.
- Rebase with main when the above is done, CI should optimally pass.
- Finaly, add a reviewee in the PR on GitHub, and let them merge with main when done reviewing!

**Reviewing code?**

- Check that the above is followed by the developer.
- Before merging the PR with main: squash the commits.

## TypeScript conventions

This project will use TypeScript as our programming language, and it is important that we follow the format specified by Microsoft. We will use a combination of camelCase and PascalCase. Always check this before creating a PR.

### Casing

**camelCase:**

- Namespaces, functions, function parameters, methods and fields should use camelCase.
- Style: `myFunctionName()`

**PascalCase:**

- Classes, enums, and enum members are capitalized.
- Style: `MyClass`

### Class members/instance variables

When naming variables within the class scope, use the `_` as prefix to indicate that the variable belongs to the class.

```ts
class Traveller {
  private _longitude: number;
  private _vehicleType: string;
```

### Setters and getters

Avoid using the words `get` and `set` when naming these methods, they should be defined as follows:

```ts
public get longitude() { return this._longitude; }
private set vehicleType(newType: string) { this._vehicleType = newType; }
```

### Naming

When naming functions, variables, etc. - use clear english, and spell everything out without any acronyms if it is not super obvious what it means.

### Comments

Write them pls.

## Formatting and indentation

We will use the Pretter formatter for this repository! I **_strongly_** recommend setting up your IDE to automatically format your code when saving.

**Guides for autoformatting**

- [JetBrains IDEs](https://prettier.io/docs/en/webstorm.html) (WebStorm, IntelliJ, etc.)
- [VS Code](https://prettier.io/docs/en/editors.html#visual-studio-code)

**Not working?** write in Discord :^)
