Test Locales
============

This directory contains locales used for unit testing.

To update locales from the pot file run the following:

    msgmerge --update fr/LC_MESSAGES/messages.po messages.pot

To compile .mo files:

    msgfmt fr/LC_MESSAGES/messages.po -o fr/LC_MESSAGES/messages.mo
