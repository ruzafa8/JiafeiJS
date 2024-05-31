/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
function getNodeType(node) {
	if (node.nodeType === 3) return 'text'
	if (node.nodeType === 8) return 'comment'
	if (node.nodeType === 11) return 'fragment'
	return node.tagName.toLowerCase()
}

/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The content
 */
function getNodeContent(node) {
	if (node.childNodes && node.childNodes.length > 0) return null;
	return node.textContent;
}

/**
 * Compare and update the attributes of a node
 * @param  {Node} templateNode The template node
 * @param  {Node} domNode      The DOM node
 */
function updateAttributes(templateNode, domNode) {
	const templateAttrs = templateNode.attributes || [];
	const domAttrs = domNode.attributes || [];

	// Remove any attributes in the DOM node that are not in the template node
	for (let i = domAttrs.length - 1; i >= 0; i--) {
		const attrName = domAttrs[i].name;
		if (!templateNode.hasAttribute(attrName)) {
			domNode.removeAttribute(attrName);
		}
	}

	// Set attributes from template node to DOM node
	for (let i = 0; i < templateAttrs.length; i++) {
		const attrName = templateAttrs[i].name;
		const attrValue = templateAttrs[i].value;
		if (domNode.getAttribute(attrName) !== attrValue) {
			domNode.setAttribute(attrName, attrValue);
		}
	}
}

/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
function diff(template, elem) {
	const domWalker = document.createTreeWalker(
		elem,
		NodeFilter.SHOW_ELEMENT,
		null,
		false
	);

	const templateWalker = document.createTreeWalker(
		template,
		NodeFilter.SHOW_ELEMENT,
		null,
		false
	);

	let currentDomNode = domWalker.currentNode;
	let currentTemplateNode = templateWalker.currentNode;

	while (currentTemplateNode || currentDomNode) {
		// If the current template node is null, remove remaining DOM nodes
		if (!currentTemplateNode) {
			const nodeToRemove = currentDomNode;
			currentDomNode = domWalker.nextNode();
			nodeToRemove.parentNode.removeChild(nodeToRemove);
			continue;
		}

		// If the current DOM node is null, add remaining template nodes
		if (!currentDomNode) {
			elem.appendChild(currentTemplateNode.cloneNode(true));
			currentTemplateNode = templateWalker.nextNode();
			continue;
		}

		// If the node types are different, replace the DOM node with the template node
		if (getNodeType(currentTemplateNode) !== getNodeType(currentDomNode)) {
			const newDomNode = currentTemplateNode.cloneNode(true);
			if (currentDomNode.parentNode)
				currentDomNode.parentNode.replaceChild(newDomNode, currentDomNode);
			currentDomNode = newDomNode;
		}

		// Update text content if necessary
		const templateContent = getNodeContent(currentTemplateNode);
		if (templateContent && templateContent !== getNodeContent(currentDomNode)) {
			currentDomNode.textContent = templateContent;
		}

		// Update attributes
		updateAttributes(currentTemplateNode, currentDomNode);

		// Check for shadow DOM
		if (currentDomNode.shadowRoot && currentTemplateNode.shadowRoot) {
			// Recursively diff the shadow DOM
			diff(currentTemplateNode.shadowRoot, currentDomNode.shadowRoot);
		}

		// Move to the next nodes
		const nextTemplateNode = templateWalker.nextNode();
		const nextDomNode = domWalker.nextNode();

		currentTemplateNode = nextTemplateNode;
		currentDomNode = nextDomNode;
	}
}

function stringToHTML(str) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.body;
}

export {
	diff,
	stringToHTML
};
