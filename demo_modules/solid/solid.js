/* Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

import {CanvasSurface} from '/client/surface/canvas_surface.js';

export function load(wallGeometry) {
  class SolidColorClient {
    constructor(config) {
      this.color = config.color || 'red';
    }

    finishFadeOut() {
      if (this.surface) {
        this.surface.destroy();
      }
    }
    willBeShownSoon(container) {
      this.surface = new CanvasSurface(container, wallGeometry);
      this.canvas = this.surface.context;
      return Promise.resolve();
    }
    draw() {
      this.canvas.fillStyle = this.color;
      this.canvas.fillRect(0, 0, this.surface.virtualRect.w, this.surface.virtualRect.h);
    }
  }

  return {client: SolidColorClient};
}
