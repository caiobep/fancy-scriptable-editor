# Fancy Scriptable Editor

> Use your modern dev environment to develop Scriptable scripts.

If you use *iOS* and *Scriptable* and want to have you fully customized editor on your laptop, this project is for you.

## How to use it?

Simply run:

```
npm run link:scriptable
```

To link your Scriptable iCloud folder with your local project. This will create a symlink, which in simple words, will create an shortcut to the original folder, so everything you see in there, is what you have in your scriptable documents.

After that you will be able to create your personal scripts under the **src** folder. Every script in this folder will be compiled and delivered to you Scriptable folder. 

You can run 
```
npm run build
```

To build the files in **src** and send the end-result to the Scriptable folder.


## How It Works?

This project uses Parcel along with other tools, to provide you the best editing experience for Scriptable. With Parcel, we can combine multiple files into one, transpile TypeScript and everything blazingly fast, the ideal structure for Scriptable. 


## Personal Scripts I am using with this.

I hate doing boring repetitive stuff, so I automate most of my web repetitive work using Scriptable and trigger it using Siri Shortcuts Automations.

