Document Management Template POET
===

The DMTPOET system is a linked document graph framework for managing complex business logic efficiently.  

This is used for creating user interfaces and binding them to merge rules to generate documents whilst modeling and analysing data.

Testing
===
download the zip
```
node dmt 
```
and open on localhost 6789 to test out ... 

Status and Milestones
===

As of Jan 2, 2014, The two stage document graph model is completed.  
As of Feb 16, 2014, The Gui renderer and data modeler is completed.

- ~~necessary refactor required to separate the graph data from the graph instance function in the graphLookup object to serialize the typed set~~
- the ui should be built from both node based partial template structures and point modules ** last thing on my mind**
- needs a simplified selector object interface
- need to allow editing of multiple graph types 
- ~~traverser is still not done~~
- ~~requires a window management layer to view the rendered document~~
  - ~~necessary refactor for the gfx layer to further abstract the coupling of the node pointer from the node itself~~
    - ~~removed universe, graphs are id'd and graphics are now typed~~
    - ~~graphs should be typed also~~

=======

Author
===
Seth Tenenbaum

License
===
GPL V3




