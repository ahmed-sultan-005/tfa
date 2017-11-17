#!/bin/bash

DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy tfa.meteorapp.com --settings ./settings.json
DEPLOY_HOSTNAME=galaxy.meteor.com meteor authorized tfa.meteorapp.com --transfer thefellowshipapp
