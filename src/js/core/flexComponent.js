function FlexComponent() {
    this.onMutation = this.onMutation.bind(this);
    this.onDomReady = this.onDomReady.bind(this);

    this._components = {};
    this._componentClassNames = [];
    
    this._observer = new MutationObserver(this.onMutation);
    this._observer.observe(document.body, { childList: true, attributes: true, characterData: true });
    
    document.addEventListener('DOMContentLoaded', this.onDomReady);
}

FlexComponent.prototype.onDomReady = function (e) {
    var self = this;

    this._componentClassNames.forEach(function (componentClassName) {
        document.querySelectorAll('.' + componentClassName).forEach(function (node) {
           self.addComponent(node, self._components[componentClassName].Constructor);
        });
    });
};

FlexComponent.prototype.onMutation = function (mutations) {
    var self = this;
    
    mutations.forEach(function (mutation) {
        var i;

        for (i = 0; i < mutation.addedNodes.length; i++) {
            self.onAddedNode(mutation.addedNodes[i]);
        }

        for (i = 0; i < mutation.removedNodes.length; i++) {
            self.onRemovedNode(mutation.removedNodes[i]);
        }
    });
};

FlexComponent.prototype.onAddedNode = function (node) {
    var self = this;
    
    this._componentClassNames.forEach(function (componentClassName) {
        if (node.nodeType === 1 && node.classList.contains(componentClassName)) {
            self.addComponent(node, self._components[componentClassName]);
        }

        for (var i = 0; i < node.childNodes.length; i++) {
            self.onAddedNode(node.childNodes[i]);
        }
    });
};

FlexComponent.prototype.onRemovedNode = function (node) {
    this.removeComponent(node);

    for (var i = 0; i < node.childNodes.length; i++) {
        this.onRemovedNode(node.childNodes[i]);
    }
};

FlexComponent.prototype.register = function (component) {
    this._components[component.className] = component.Constructor;
    this._componentClassNames.push(component.className);
};

FlexComponent.prototype.addComponent = function (node, Component) {
    if (this.isComponent(node)) {
        return;
    }
    node.__flexcomponent__ = new Component(node);
};

FlexComponent.prototype.removeComponent = function (node) {
    if (!this.isComponent(node)) {
        return;
    }

    if (node.__flexcomponent__.destroy) {
        node.__flexcomponent__.destroy();
    }

    delete node.__flexcomponent__;
};

FlexComponent.prototype.isComponent = function (node) {
    return node.__flexcomponent__;
};

module.exports = new FlexComponent();