# How to Use Git Flow
**Last Updated:** June 20, 2026

---

## Terminal commands for Git Flow setup (don't use "preview" as this doesn't render properly)


trbovich@MacBook-Pro-2 hl7 % git branch
* develop
  master
trbovich@MacBook-Pro-2 hl7 % git flow init
Already initialized for gitflow.
To force reinitialization, use: git flow init -f
trbovich@MacBook-Pro-2 hl7 % git flow init -f

Which branch should be used for bringing forth production releases?
   - develop
   - master
Branch name for production releases: [master] 

Which branch should be used for integration of the "next release"?
   - develop
Branch name for "next release" development: [develop] 

How to name your supporting branch prefixes?
Feature branches? [feature/] feature/
Release branches? [release/] release/
Hotfix branches? [hotfix/] hotfix/
Support branches? [support/] support/
Version tag prefix? [] v
trbovich@MacBook-Pro-2 hl7 % git branch
* develop
  master
trbovich@MacBook-Pro-2 hl7 % git flow feature start hotfix/       
fatal: 'feature/hotfix/' is not a valid branch name
hint: See 'git help check-ref-format'
hint: Disable this message with "git config set advice.refSyntax false"
Could not create feature branch 'feature/hotfix/'
trbovich@MacBook-Pro-2 hl7 % git flow feature start hotfix 
Switched to a new branch 'feature/hotfix'

Summary of actions:
- A new branch 'feature/hotfix' was created, based on 'develop'
- You are now on branch 'feature/hotfix'

Now, start committing on your feature. When done, use:

     git flow feature finish hotfix

trbovich@MacBook-Pro-2 hl7 % 