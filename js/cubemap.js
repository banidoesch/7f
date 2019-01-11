function init() {
	
alpha = function (){
  // stats = initStats();
   //stats.name = "d ungu"

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();
    scene.name = scene;

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 300);
    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 10;
    camera.position.z = 10;
    camera.lookAt(scene.position);
    // ccontrols = new THREE.OrbitControls( camera );
    
  fpControls = new THREE.FirstPersonControls(camera);
  fpControls.lookSpeed = 0.4;
  fpControls.movementSpeed = 20;
  fpControls.lookVertical = true;
  fpControls.constrainVertical = true;
  fpControls.verticalMin = 1.0;
  fpControls.verticalMax = 2.0;
  fpControls.lon = -150;
  fpControls.lat = 120;
    
    
    
    // create a render and set the size
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    
    axis = new THREE.AxesHelper();
    scene.add(axis);
    
        // add spotlight for the shadows
    spotLight = new THREE.SpotLight(0x8888dd, 1.2, 50, 10);
    spotLight.position.set(0, 1, 0);
    spotLight.castShadow = false;
    scene.add(spotLight);
    var spotLightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( spotLightHelper )
    
        // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);
    
       controls = new function () {
        this.rotationSpeed = 0.02;
        this.para = 5;
        this.numberOfObjects = scene.children.length;
        
        this.spotLight= spotLight.position.y ;

        this.removeCube = function () {
             for(i=0; i<33; i++){
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
            }
        };

        this.addCube = function () {
            for(i=0; i<100; i++){
            var cubeSize = Math.ceil((Math.random() * 10+10));
            var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize*Math.random(), (Math.random() * 10+10));
            var cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffee
            });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-" + scene.children.length;


            // position the cube randomly in the scene

            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));


            // add the cube to the scene
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
            //addcube();
        }
   
            
        };

        this.outputObjects = function () {
            console.log(scene.children);
        }
    };
    
    gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0.0002, 0.005);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();
    gui.add(controls, "para");
    gui.add(controls, "spotLight", -10, 200);

    
   
   // trackballControls = initTrackballControls(camera, renderer);
   
   clock = new THREE.Clock();
}
alpha();
//trackballControls = initTrackballControls(camera, renderer);
  gridf = function(){  //Grid
    var size = 10
    var divi = 5
    var grid = new THREE.GridHelper(size, divi);
    scene.add(grid);
    
    var size = 50;
var divisions = 10;
var colorCenterLine = 0x3388aa
var colorGrid = 0x771188

var grid = new THREE.GridHelper( size, divisions , colorGrid, colorCenterLine);
//grid.color = 0xee2233
scene.add( grid );

scene.add(new THREE.GridHelper(100, 10, ("red"), ("blue")));
    
}
gridf();
plan = function (){
			// create the ground plane
			planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
			//var planeMaterial = new THREE.MeshLambertMaterial();
			//{color: 0xffffdd}
			//planeMaterial.bumpMap = THREE.TextureLoader().load("grey.jpg");
			
			//planeMaterial.bumpMap = THREE.ImageUtils.TextureLoader("grey.jpg");
			
			//planeMaterial.map = THREE.ImageUtils.loadTexture("grey.jpg");
			
			var texture = new THREE.TextureLoader().load("2019.jpg");
			material = new THREE.MeshPhongMaterial( { bumpMap: texture } );

			plane = new THREE.Mesh(planeGeometry, material);
			plane.receiveShadow = true;
 
			// rotate and position the plane
			plane.rotation.x = -0.5 * Math.PI;
			plane.position.x = 0;
			plane.position.y = -2;
			plane.position.z = 0;

			// add the plane to the scene
			scene.add(plane);
			console.log("plane")
};
	plan();		


cub = function(){
				//cubiSpot
			
			cubgeo = new THREE.BoxGeometry(1,1,1);
			cubmat = new THREE.MeshLambertMaterial({emissive: 0xff31cc} );
			cubi = new THREE.Mesh(cubgeo, cubmat);
			scene.add(cubi);
			cubi.position.set = spotLight.position.set
			cubi.emissive = 0xff3311
			
			
			//cubi2
			
			cubgeo = new THREE.BoxGeometry(3,1,3);
			cubmat = new THREE.MeshPhongMaterial(0xff0000);
			cubi2 = new THREE.Mesh(cubgeo, cubmat);
			scene.add(cubi2);
			//cubi2.position.set = scene.spotLight.position.set
			console.log("cubi2.position.: ",cubi2.position.x, cubi2.position.y,cubi2.position.z);
					
};
cub();



cubmap1 = function(){
			
			
			var loader = new THREE.CubeTextureLoader();
			
				loader.setPath( './pics/ww1/' );
				
				var textureCube = loader.load( [
				'px.png', 'nx.png',
				'py.png', 'ny.png',
				'pz.png', 'nz.png'
]);

var textureCube2 = loader.load ([
 "right.png", "left.png",
 "top.png", "bottom.png",
"back.png", "front.png"
]);

//loader.onload(console.log("loader hat geladen"));

var materialx = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube2, side: THREE.DoubleSide } );
				
				
			cubmap1geo = new THREE.BoxGeometry(100,100,100);
			cubemap1 = new THREE.Mesh(cubmap1geo, materialx);
			//cubemap1.size *= 1.1
			cubemap1.transparent = true;
cubemap1.side = THREE.DoubleSide;
cubemap1.depthWrite = false;
// cubemap1.color = new THREE.Color(
			scene.add(cubemap1);
			/*
			urls = [
'right.png',
'left.png',
'top.png',
'bottom.png',
'front.png',
'back.png'
];

			cubemap = THREE.ImageUtils.loadTextureCube(urls);
			cubemap.format = THREE.RGBFormat;			
			var shader=0;
			var vshader;
			 = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = cubemap;

		material = new THREE.ShaderMaterial( {
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			depthWrite: false,
			side: THREE.DoubleSide
	});
	
// create the skybox
var skybox = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
scene.add(skybox);	
	*/		
};
cubmap1();
    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);
    // call the render function
    var step = 0;
    //var trackballControls = initTrackballControls(camera, renderer);
    render(); 
    function render() {
  //controls.addcube();
        //trackballControls.update(clock.getDelta());
        //stats.update();
        
        spotLight.position.y = controls.spotLight
        cubi.position.y = controls.spotLight 
        //console.log(cubi.position.y)
        //ccontrols.update();

fpControls.update(clock.getDelta());
 
        requestAnimationFrame(render);
        //setTimeout(100)
        renderer.render(scene, camera);
     
    }
}
monitor ();
function monitor(){
	  setTimeout(10000)
	  
	  //cc = scene.cubi.position.y
	 // console.log(cc)
}
