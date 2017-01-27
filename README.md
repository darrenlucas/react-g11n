react-g11n
==========

An internationalisation and localization library for React.


Installation
------------

    npm install react-g11n


Usage
-----

The provider pattern is used to wrap your component and provide a translator
object to child components.  Wrap your component in a Localizer as follows:


    import { render } from "react-dom"
    import { Localizer } from "react-g11n"

    import App from "app"

    render(
        <Localizer locale="cy">
            <App />
        </Localizer>
    }


From within a child component you can gain access to a translator property as
follows:

    import React, { PropTypes} from "react"
    import { localize } from "react-g11n"

    class MyComponent extends React.Component {

        render() {
            const { translator } = this.props

            return (
                <h1>{translator.gettext('Hello world!')}</h1>
            )

    }

    MyComponent.propTypes = {
        translator: PropTypes.object.isRequired
    }

    export default localize(MyComponent)


The translate object exposes the a Gettext object with common gettext functions


Working with gettext translation files
--------------------------------------

GNU gettext is an internationalization and localization system commonly used on
Unix like operating systems.

Three types of files are used in the GNU gettext translation framework:

* .pot (Portable Object Template) files

  A .pot file is created by a program which searches through a projects source code
  and picks out every message identifier passed to gettext translation functions.
  The list of message identifiers is placed into a .pot file which serves as a
  template for creating .po files.

* .po (Portable Object) files

  A .po file is derived from the template and fills out the translations.

* .mo (Machine Object) files

  A .po file is compiled into a binary .mo file optimized for reading by a machine.


### Extracting messages

To extract messages from javascript files use jsxgettext which can be installed
from npm:

    npm install jsxgettext --save-dev


This will install a command called jsxgettext which can be used to scan javascript
code for calls to gettext and extract translations into a portable object template:

    mkdir -p src/locale
    node_modules/.bin/jsxgettext src/**/*.js -o src/locale/messages.pot

This will output a .pot file to src/locale/messages.pot


### Initializing a message catalog file

Once messages have been extracted into a .pot file this can be used to generate a
.po file.  A .po file contains translations for a set of messages for a particular
locale.  The Gettext msginit command can be used to initialize a .po file:

    cd src/locale
    mkdir -p cy/LC_MESSAGES
    msginit -l cy -o cy/LC_MESSAGES/messages.po

This will create a new message catalog .po file which can then be edited by a human
translator using a tool such as Poedit.


### Updating a message catalog file

As more translation strings are added, or as existing strings are changed it will be
neccessary to update existing .po files so that new and changed messages can be
translated.

First regenerate the .pot file as per the Extracting messages section and then use
the msgmerge command from Gettext.

    cd src/locale
    msgmerge --update cy/LC_MESSAGES/messages.po messages.pot


### Compiling a message catalog file

To convert translation files into a machine readable binary file use the Gettext
msgfmt command to convert .po files into .mo files.

    cd src/locale
    msgfmt cy/LC_MESSAGES/messages.po -o cy/LC_MESSAGES/messages.mo


### Automating with Make

To make the above commands easier, the can be codified into Makefile targets to
provide the following phony targets:

* extract-messages
* update-catalog
* compile-catalog

An example Makefile would be:

    SRC_DIR = src/
    POT_FILE = $(SRC_DIR)/locale/messages.pot
    PO_FILES := $(shell find $(SRC_DIR) -type f -name '*.po')
    MO_FILES := $(patsubst $(SRC_DIR)/%.po,$(SRC_DIR)/%.mo,$(PO_FILES))

    JSXGETTEXT_CMD = node_modules/.bin/jsxgettext

    .PHONY: extract-messages
    extract-messages:			## Extract translations from source code
            $(JSXGETTEXT_CMD) $(SRC_DIR)/**/*.js -o $(POT_FILE)

    .PHONY: update-catalog
    update-catalog: $(PO_FILES)		## Update messages catalogs for all locales

    $(PO_FILES): $(POT_FILE)
            msgmerge --previous $@ $? -o $@

    .PHONY: compile-catalog
    compile-catalog: $(MO_FILES)	## Compile messages catalogs for all locales

    $(MO_FILES): $(SRC_DIR)/%.mo: $(SRC_DIR)/%.po
            mkdir -p $(@D)
            msgfmt $< -o $@


A translation workflow would then be:

    make extract-messages
    make update-catalog

Once translations of the generate .po files has taken place the .mo files can
be compiled with:

    make compile-catalog

