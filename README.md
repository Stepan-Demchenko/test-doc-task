## TestDoc
Application allow user to add an annotation (picture or inscription) to any page of the document. Documents represent of png files.
Document retrieves by using http request to the json file which placed by path '/assets/data/'.

<br/>
<strong>#Services</strong>
<br/>
ContextMenuService implement create and close context menu. DocumentService retrieve documents over Http. PasteDynamicComponentService 
implements dynamic creation of annotations on the clicked area of the document. ZoomContentService implements store of current zoom/scale of page.

<strong>#Store.</strong>
<br/>
Used as storage is service placed by path 'src/app/shared/services/dynamic-components-store.service.ts'. In the store stored 
all created annotation component. The service also allows us to remove particular component by its id and show inside console
all created annotation with their number of document, type, content, size and coordinates.

<strong>#Containers</strong>
<br/>
DocsListComponent is represented all documents retrieves from the server, also inside this component place logic to detect which document in the view port
and saving document id inside route url. After the refresh the page, it scrolls to the concrete document by its id stored inside route url. 
Also, this component subscribe to the change of zoom and implemented it.

<strong>#Directives.</strong>
<br/>
Created directives for the drag element within the particular container, ClickOutsideDirective directive in case when need some action if user clicked 
outside particular element. VisibleDocumentDirective directive in case when need to watch of visibility of concrete element.

<strong>#Annotation.</strong>
<br/>
Used ImageComponent and TextComponent as annotations components. Wrapped by DynamicComponentWrapperComponent. In the DynamicComponentWrapperComponent
used DragElementDirective for the drag created annotations by document.

<strong>#Issues.</strong>
<br/>
- Duplicated functions "onClickOutsideAnnotation" in the ImageComponent and TextComponent, this function allow us to remove created annotation if there is no content inside.
To resolve this issue we can implement bridge pattern and check if content set directly inside  DynamicComponentWrapperComponent.
- Using "setTimeOut()" inside DocsListComponent. This is a forced measure to be able to scroll to a specific document after it has been rendered to the DOM. Without this function, 
it is impossible to get a link to a specific document, it has not yet been displayed on the page. There are several ways to solve this problem, the first of which is to set the 
height of the documents on the page to a fixed height, since currently the height of the document depends on the height of the displayed document image. This will give us the ability
to scroll to a specific area of the page before displaying the document on the page.
