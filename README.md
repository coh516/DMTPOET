Document Management Template POET
===

The DMTPOET system is a linked document graph framework for managing complex business logic efficiently.  

This is used for creating user interfaces and binding them to merge rules to generate documents whilst modeling and analysing data.

Essentially this is a tool to build an application layer with modular route patches focusing on memory management and performance using an indexed database design. 

Testing
===
download the zip, or use the standard git installation or use npm's github functionality...
```
node dmt 
```
and open on localhost 6789 to test out ... 

Status and Milestones
===

As of Jan 2, 2014, The two stage document graph model is completed.  
As of Feb 16, 2014, The Gui renderer and data modeler is completed.
As of April 25, 2014, the tool is useable, but there are architectural errata that need to be addressed
  - most importantly, the vector reindexing needs to be properly handled from the graph.rebuild and gfx.render functions without additional measures taken from the individual editing commands 

- ~~necessary refactor required to separate the graph data from the graph instance function in the graphLookup object to serialize the typed set~~
- the ui should be built from both node based partial template structures and point modules
- needs a simplified selector object interface
  - modularize prototype layers from ptr graph locators
  - requires an eventing system for instantiated objects
  - ~~point interface contains most of the helpers required to deal with the object array pointers~~
- need to allow editing of multiple graph types
- need to fix the rendering of the link node lines... it should be part of the htmlRenderer
- ~~need to fix the remove child/subchild relinking~~
- need to enhance the deferment / promise fulfilment eventing methodology
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
MIT




