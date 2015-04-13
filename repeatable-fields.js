/*
 * jQuery Repeatable Fields v1.3.1
 * http://www.rhyzz.com/repeatable-fields.html
 *
 * Copyright (c) 2014-2015 Rhyzz
 * License MIT
 */

(function ($) {
    $.fn.repeatable_fields = function (custom_settings) {
        var default_settings = {
            wrapper: '.wrapper',
            container: '.container',
            row: '.row',
            add: '.add',
            remove: '.remove',
            move: '.move',
            template: '.template',
            is_sortable: true,
            remove_action: "remove",
            before_add: null,
            after_add: null,
            before_remove: null,
            after_remove: null,
            sortable_options: null
        };

        var settings = $.extend(default_settings, custom_settings);

        // Initialize all repeatable field wrappers
        initialize(this);

        function add_row(event, container) {
            event.stopImmediatePropagation();

            var row_template = $($(container).children(settings.template).clone().removeClass(settings.template.replace('.', ''))[0].outerHTML);

            // Enable all form elements inside the row template
            $(row_template).find(':input').each(function () {
                $(this).prop('disabled', false);
            });

            if (typeof settings.before_add === 'function') {
                settings.before_add(container);
            }

            var new_row = $(row_template).show().appendTo(container);

            after_add(container, new_row);

            if (typeof settings.after_add === 'function') {
                settings.after_add(container, new_row);
            }

            // The new row might have it's own repeatable field wrappers so initialize them too
            initialize(new_row);
        }

        function remove_row(event, container) {
            event.stopImmediatePropagation();

            var row = $(event.target).parents(settings.row).first();

            if (typeof settings.before_remove === 'function') {
                settings.before_remove(container, row);
            }

            switch (settings.remove_action) {
                case "hide":
                    row.hide();
                    break;
                case "disable":
                    row.disable();
                    break;
                case "remove":
                default:
                    row.remove();
                    break;
            }

            if (typeof settings.after_remove === 'function') {
                settings.after_remove(container);
            }
        }

        function initialize(parent) {
            $(settings.wrapper, parent).each(function (index, element) {
                var wrapper = this;

                var container = $(wrapper).children(settings.container);

                // Disable all form elements inside the row template
                $(container).children(settings.template).hide().find(':input').each(function () {
                    $(this).prop('disabled', true);
                });

                var row_count = $(container).children(settings.row).filter(function () {
                    return !$(this).hasClass(settings.template.replace('.', ''));
                }).length;

                $(container).attr('data-rf-row-count', row_count);

                $(wrapper).on('click', settings.add, function (event) {
                    add_row(event, container);
                    return false;
                });
                $(settings.add).on('click', function (event) {
                    add_row(event, container);
                    return false;
                });

                $(wrapper).on('click', settings.remove, function (event) {
                    remove_row(event, container);
                    return false;
                });
                $(settings.remove).on('click', function (event) {
                    remove_row(event, container);
                    return false;
                });

                if (settings.is_sortable === true && typeof $.ui !== 'undefined' && typeof $.ui.sortable !== 'undefined') {
                    var sortable_options = settings.sortable_options !== null ? settings.sortable_options : {};

                    sortable_options.handle = settings.move;

                    $(wrapper).find(settings.container).sortable(sortable_options);
                }
            });
        }

        function after_add(container, new_row) {
            var row_count = $(container).attr('data-rf-row-count');

            row_count++;

            $('*', new_row).each(function () {
                $.each(this.attributes, function (index, element) {
                    this.value = this.value.replace(/{{row-count-placeholder}}/, row_count - 1);
                });
            });

            $(container).attr('data-rf-row-count', row_count);
        }
    }
})(jQuery);
