#include "ofMain.h"
#include "ofApp.h"

//========================================================================
int main( ){
	
    int windowWidth = 1024;
    int windowHeight = 500;
    
    
    ofGLFWWindowSettings settings;
	
    settings.setGLVersion(1,0);
	settings.width = 1280;
	settings.height = 720;
	settings.setPosition(ofVec2f(300, 0));
	settings.resizable = true;
	shared_ptr<ofAppBaseWindow> mainWindow = ofCreateWindow(settings);
	
	settings.width = 300;
	settings.height = 200;
	settings.setPosition(ofVec2f(0, 0));
	settings.resizable = false;
	// uncomment next line to share main's OpenGL resources with gui
	//settings.shareContextWith = mainWindow;
	shared_ptr<ofAppBaseWindow> guiWindow = ofCreateWindow(settings);
	guiWindow->setVerticalSync(false);
	
	shared_ptr<ofApp> mainApp(new ofApp);
	mainApp->setupGui();
	ofAddListener(guiWindow->events().draw,mainApp.get(),&ofApp::drawGui);
	
	ofRunApp(mainWindow, mainApp);
	ofRunMainLoop();
	
}