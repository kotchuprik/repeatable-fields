/*
 * jQuery Repeatable Fields v1.3.1
 * http://www.rhyzz.com/repeatable-fields.html
 *
 * Copyright (c) 2014-2015 Rhyzz
 * License MIT
 */
/*
 * Additions by Sam Black <samwwwblack@lapwing.org>
 * Copyright (c) 2015 Sam Black <samwwwblack@lapwing.org>
 *     1. Allow either removal, hiding or disabling rows.
 *     2. Refactor add/remove functions out
 *     3. Select elements regardless if they are in the container
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
            remove_disable_class: "disabled",
            undo_enable: false,
            undo: ".undo",
            before_add: null,
            after_add: null,
            before_remove: null,
            after_remove: null,
            before_undo: null,
            after_undo: null,
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
                    row.addClass(settings.remove_disable_class);
                    row.find(":input").prop("disabled", true);
                    row.find("input[type='hidden']").prop("disabled", false);
                    if (settings.undo_enable) {
                        row.find(settings.remove).hide();
                        row.find(settings.move).hide();
                        row.find(settings.undo).show().prop("disabled", false);
                    }
                    else {
                        row.find(settings.move).css("pointer-events", "none");
                    }
                    break;
                case "remove":
                default:
                    row.remove();
                    break;
            }

            if (typeof settings.after_remove === 'function') {
                if (settings.remove_action !== "disable" && settings.remove_action !== "hide") {
                    row = null;
                }
                settings.after_remove(container, row);
            }
        }

        function undo_remove_row(event, container) {
            event.stopImmediatePropagation();

            var row = $(event.target).parents(settings.row).first();

            if (typeof settings.before_undo === 'function') {
                settings.before_undo(container, row);
            }

            row.removeClass(settings.remove_disable_class);
            row.find(":input").prop("disabled", false);
            row.find(settings.undo).hide();
            row.find(settings.remove).show();
            row.find(settings.move).show();

            if (typeof settings.after_undo === 'function') {
                settings.after_undo(container, row);
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

                // Hide the undo
                $(container).children().find(settings.undo).hide();
                if (settings.undo_enable) {
                    $(container).children().find(settings.remove).each(function(index, child) {
                        var elem = $(child);
                        if (elem.prop("disabled") !== null && elem.prop("disabled") !== undefined &&
                                (elem.prop("disabled") === "" || elem.prop("disabled") === "disabled" ||
                                 elem.prop("disabled") === true)) {
                            var row = elem.parents(settings.row);
                            row.find(settings.remove).hide();
                            row.find(settings.move).hide();
                            row.find(settings.undo).show().prop("disabled", false);
                        }
                    });
                }

                var row_count = $(container).children(settings.row).filter(function () {
                    return !$(this).hasClass(settings.template.replace('.', ''));
                }).length;

                $(container).attr('data-rf-row-count', row_count);

                // Allow the Add button to be in the container or elsewhere
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

                if (settings.undo_enable) {
                    $(wrapper).on('click', settings.undo, function (event) {
                        undo_remove_row(event, container);
                        return false;
                    });
                }

                if (settings.is_sortable === true && typeof $.ui !== 'undefined' && typeof $.ui.sortable !== 'undefined') {
                    var sortable_options = settings.sortable_options !== null ? settings.sortable_options : {};

                    sortable_options.handle = settings.move;

                    $(wrapper).find(settings.container).sortable(sortable_options);
                }
            });
        }

        function after_add(container, new_row) {
            new_row.find(settings.undo).hide();
            new_row.find(settings.remove).show();
            new_row.find(settings.move).show();

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
