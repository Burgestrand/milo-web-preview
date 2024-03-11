# Web-based Milo color tool

> I got fed up with Fusion 360s handling of appearances. All I want to do is to experiment with color choices for the printed parts of the Milo.
>
> I'm ordering filament *really soon* so I wanted something *very quick and dirty* just to play around. There are loads of improvements to be done just about everywhere.

* Hosted at https://www.burgestrand.se/milo-web-preview/
* Built with [Astro](https://astro.build).
* See [Millennium Machines](https://github.com/MillenniumMachines/) and [Milo v1.5](https://github.com/MillenniumMachines/Milo-v1.5).

## Developing

It's built using [Astro](https://astro.build), which you can refer to for guidance.

You need [git lfs](https://git-lfs.com), since the CAD-file is stored in this repository using it.

```
asdf install
npm install
npm run dev
```

### Re-exporting the CAD

1. Open the [CAD](https://github.com/MillenniumMachines/Milo-v1.5/tree/main/CAD) step file in Fusion 360.
2. Export the CAD from Fusion 360 to an FBX file.
3. Import the FBX in Blender.
4. Export the FBX from Blender to GLB.
5. Add the GLB to `public/CAD.glb`.

## Contributing

It's probably rather difficult to contribute to this repository due to:

* No overall plan or direction.
* Code is not all to structured to allow for paralell work.

However if you want to help out that's awesome! Feel free to contact me and we'll chat.

## License

This repository is under [GNU AGPL v3](https://choosealicense.com/licenses/agpl-3.0/).

The licensing is not super important to me. The main point I'm trying to achieve is that if you copy this repository and the source code, then I want you to continue sharing with the community by making your derivative work open source too.
