var flexComponent = require('./core/flexComponent');

function Button(el) {
    this.el = el;

    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('click', this.onClick);
}

Button.prototype.onClick = function (e) {
    console.log(e);
};

Button.prototype.destroy = function () {
    this.el.removeEventListener('click', this.onClick);
};

flexComponent.register({
    className: 'btn',
    Constructor: Button
});