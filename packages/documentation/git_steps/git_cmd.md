

Switch to the Base Branch:
If you want your new branch to start from main (or any other branch), first switch to that branch:

    git checkout main

Update Your Base Branch (Optional but Recommended):
Make sure your base branch has the latest changes from the remote:

    git pull origin main

Create and Switch to a New Branch:
Create your new branch and switch to it in one command. Replace new-feature with your desired branch name:

    git checkout -b new-feature

Push the New Branch to Remote:
Push your new branch to GitHub and set the upstream branch:

    git push -u origin new-feature


Once you've made changes on your branch and committed them, here’s how to push those changes and then merge multiple branches.
Pushing Your Changes

    Stage Your Changes:
    Add the files you want to commit:

    git add .

(You can also add specific files instead of using .)

Commit Your Changes:
Commit your changes with a descriptive message:

    git commit -m "change: comment goes here"

Push Your Changes:
Since you’ve already set the upstream branch when creating your branch, simply push:

    git push

If this is your first push from this branch and upstream isn’t set, you can use:

    git push -u origin your-branch-name

Merging Multiple Branches

To merge changes from multiple branches, you typically merge them one by one into your target branch (commonly main). Here’s how to do it:

Switch to Your Target Branch:
For example, if you want to merge changes into main:

    git checkout main

Update the Target Branch:
Ensure your main branch is up to date:

    git pull origin main

Merge a Branch into Your Target Branch:
Merge the first branch (e.g., new-feature):

    git merge new-feature

Resolve any conflicts if they arise, then commit the merge if needed.

Merge Additional Branches:
Repeat the merge process for each additional branch (e.g., bugfix):

    git merge bugfix

Again, handle conflicts as needed.

Push the Merged Changes to Remote:
Once all merges are complete:

    git push origin main

Tips for a Smooth Merge Process

Resolve Conflicts Promptly:
If Git detects conflicts during a merge, it will mark them in the affected files. Open those files, fix the conflicts, and then:

    git add <resolved-files>
    git commit