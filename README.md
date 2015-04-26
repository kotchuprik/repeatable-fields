# Repeatable Fields

## Upstream
[Upstream Plugin's Homepage with Demo](http://www.rhyzz.com/repeatable-fields.html)

[Rhyzz Github](https://github.com/Rhyzz/repeatable-fields)

## Upstream fork demo
[Demo](https://lapwingorg.github.io/repeatable-fields)

## Fork differences

Another workflow:

![Alt text](https://monosnap.com/file/nDBkqMfxviJJVoY00Hhqf2BOXx7sNN.png)

## Description

Repeatable Fields is a jQuery plugin which let's you create a set of fields that can be made to repeat. You can do the following to a field that is repeatable:

* Add new instance
* Remove existing instance
* Reposition an instance

The functionality that is provided by this plugin can also be referred to as:

* Dynamic Fields Plugin
* Dynamic Rows plugin
* Add Remove Rows Plugin

## Requirements

This plugin requires [jQuery](http://jquery.com/) and [jQuery UI Sortable](https://jqueryui.com/sortable/).

### Example

#### HTML

    <div class="repeat">
        <table class="wrapper" width="100%">
            <thead>
                <tr>
                    <td width="10%" colspan="4"><span class="add">Add</span></td>
                </tr>
            </thead>
            <tbody class="container">
            <tr class="template row">
                <td width="10%"><span class="move">Move</span></td>

                <td width="10%">An Input Field</td>

                <td width="70%">
                    <input type="text" name="an-input-field[{{row-count-placeholder}}]" />
                </td>

                <td width="10%">
                    <span class="remove">Remove</span>
                    <span class="undo">Undo remove</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

#### JavaScript

    $(document).ready(function() {
        $("#id_selector").repeatable_fields();
    }

## Options

```
wrapper: '.wrapper',
container: '.container',
row: '.row',
add: '.add',
remove: '.remove',
move: '.move',
template: '.template',
remove_action: "remove",
remove_disable_class: "disabled",
removed_field_property: "disabled",
undo_enable: false,
undo: ".undo",
before_add: null,
after_add: null,
before_remove: null,
after_remove: null,
before_undo: null,
after_undo: null,
is_sortable: true,
sortable_options: null
```

<dl>
<dt>wrapper</dt>
<dd>Specifies an element that acts as a wrapper.</dd>

<dt>container</dt>
<dd>Specifies an element within the wrapper which acts as a container.</dd>

<dt>row</dt>
<dd>Specifies an element within the container that acts as a row holder. The row is what is repeated.</dd>

<dt>add</dt>
<dd>Specifies an element within the wrapper which let's you add more more.
Note: If there are multiple repeatable-fields enabled forms on the page, it will be necessary to set this as unique for each instantiation.</dd>

<dt>remove</dt>
<dd>Specifies an element within the row which let's you remove the current row</dd>

<dt>move</dt>
<dd>Specifies an element within the row which let's you reposition the current row.</dd>

<dt>template</dt>
<dd>Specifies an element within the container which acts as a row template.</dd>

<dt>remove_action</dt>
<dd>Specifies how to "delete" a row, either by removing (default), hiding or disabling.
Disabling a row allows the "delete" to be undone.</dd>

<dt>remove_disable_class</dt>
<dd>If "remove_action" is "disable", the row will have this class added to it to signify it has been "deleted".</dd>

<dt>removed_field_property</dt>
<dd>If "remove_action" is "disable", the row fields will either have the "disabled" (default) or "read-only" attributes set.</dd>

<dt>undo_enable</dt>
<dd>If "remove_action" is "disabled", whether to allow the user to "undo" the deletion.</dd>

<dt>undo</dt>
<dd>Specifies an element within the row which let's you undo the row "deletion"</dd>

<dt>before_add</dt>
<dd>Specifies a function to run before a row is added</dd>

<dt>after_add</dt>
<dd>Specifies a function to run after a row is added</dd>

<dt>before_remove</dt>
<dd>Specifies a function to run before a row is removed</dd>

<dt>after_remove</dt>
<dd>Specifies a function to run after a row is removed</dd>

<dt>before_undo</dt>
<dd>Specifies a function to run before a row is unremoved</dd>

<dt>after_undo</dt>
<dd>Specifies a function to run after a row is unremoved</dd>

<dt>is_sortable</dt>
<dd>If to allow the rows in the container to be sorted.</dd>

<dt>sortable_options</dt>
<dd>Specifies an object that can contain Options, Methods and Events which are passed to jQuery UI Sortable</dd>
</dl>

