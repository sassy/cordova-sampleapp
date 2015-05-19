describe("app test", function() {
    describe('initialize', function() {
      beforeEach(function() {
          spyOn(app, 'onDeviceReady');
          spyOn(app, 'receivedEvent').and.callFake(function(id) {
              console.log(id);
          });
          app.initialize();
          helper.trigger(window.document, 'deviceready');
      });
      it ("should bind deviceready", function() {
          expect(app.onDeviceReady).toHaveBeenCalled();
      });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            if (el !== null) {
                el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
            } else {
                document.body.innerHTML =  ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
            }
        });
        it ('should hide the listenning element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
        afterEach(function() {
            var el = document.getElementById('stage');
            if (el !== null) {
              el.innerHTML = '';
            }
        });
    });

    describe('launch camera', function() {
        it ('should launch camera ', function() {
            // TODO: think plugin stub
            navigator.camera = {
                getPicture : function(a, b, c) {
                    a();
                }
            };
            spyOn(navigator.camera, 'getPicture');
            app.launchCamera();
            expect(navigator.camera.getPicture).toHaveBeenCalled();
        });
    });

});
