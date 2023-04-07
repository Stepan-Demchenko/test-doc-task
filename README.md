# TestDoc
Application allow user to add an annotation (picture or inscription) to any page of the document. Documents represent of png files.
Documents retrieves by using http request to the json file which placed by path '/assets/data/'.

#Services
ContextMenuService implement create and close context menu. DocumentService retrieve documents over Http. PasteDynamicComponentService 
implements dynamic creation of annotations on the clicked area of the document. ZoomContentService implements store of current zoom/scale of page.

#Store
Used as storage is service placed by path 'src/app/shared/services/dynamic-components-store.service.ts'. In the store stored 
all created annotation component. The service also allows us to remove particular component by its id and show inside console
all created annotation with their number of document, type, content, size and coordinates.

#Containers
DocsListComponent is represent all documents retrieves from the server, also inside this component place logic to detect which document in the view port
and saving document id inside route url. After the refresh the page, it scrolls to the concrete document by its id stored inside route url. 
Also this component subscribe to the change of zoom and implemented it.

#Directives
Created directives for the drag element within the particular container, ClickOutsideDirective directive in case when need some action if user clicked 
outside particular element. VisibleDocumentDirective directive in case when need to watch of visibility of concrete element.

#Annotation
Used ImageComponent and TextComponent as annotations components. Wrapped by DynamicComponentWrapperComponent. In the DynamicComponentWrapperComponent
used DragElementDirective for the drag created annotations by document.
