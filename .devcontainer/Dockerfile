# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.145.1/containers/alpine/.devcontainer/base.Dockerfile

#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.128.0/containers/javascript-node-12/.devcontainer/Dockerfile
#FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-12
FROM mhart/alpine-node:12.18.3

# ** [Optional] Uncomment this section to install additional packages. **
#
# RUN apt-get update \
#     && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
RUN apk add bash 
RUN apk add git
