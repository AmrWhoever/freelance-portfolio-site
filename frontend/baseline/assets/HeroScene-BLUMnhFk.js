import{S as ve,B as xe,M as z,a as Se,P as Me,b as p,I as Pe,O as ye,c as Ee,d as Ae,e as be,F as fe,f as y,U as j,V as v,W as H,H as k,N as Re,T as Be,C as L,g as I,A as Fe,h as De,R as Ne,i as Ue,j as Ie,L as ze,k as Le,l as Oe,m as _e,n as Ge,o as Qe,p as Ve,q as He,r as ke,s as We,D as ce,G as Q,t as je,E as Xe,u as Ke,v as Ye,w as qe,x as de,y as Je,z as Ze,J as $e,K as et,Q as tt,X as st,Y as it}from"./three-B3UHUoXq.js";import{_ as at,r as pe,w as me,o as rt,a as ot,c as nt,b as lt,d as S,e as ht}from"./index-DwXrsU_4.js";class ut extends ve{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new xe;e.deleteAttribute("uv");const s=new z({side:Se}),r=new z,a=new Me(16777215,900,28,2);a.position.set(.418,16.199,.3),this.add(a);const t=new p(e,s);t.position.set(-.757,13.219,.717),t.scale.set(31.713,28.305,28.591),this.add(t);const o=new Pe(e,r,6),i=new ye;i.position.set(-10.906,2.009,1.846),i.rotation.set(0,-.195,0),i.scale.set(2.328,7.905,4.651),i.updateMatrix(),o.setMatrixAt(0,i.matrix),i.position.set(-5.607,-.754,-.758),i.rotation.set(0,.994,0),i.scale.set(1.97,1.534,3.955),i.updateMatrix(),o.setMatrixAt(1,i.matrix),i.position.set(6.167,.857,7.803),i.rotation.set(0,.561,0),i.scale.set(3.927,6.285,3.687),i.updateMatrix(),o.setMatrixAt(2,i.matrix),i.position.set(-2.017,.018,6.124),i.rotation.set(0,.333,0),i.scale.set(2.002,4.566,2.064),i.updateMatrix(),o.setMatrixAt(3,i.matrix),i.position.set(2.291,-.756,-2.621),i.rotation.set(0,-.286,0),i.scale.set(1.546,1.552,1.496),i.updateMatrix(),o.setMatrixAt(4,i.matrix),i.position.set(-2.193,-.369,-5.547),i.rotation.set(0,.516,0),i.scale.set(3.875,3.487,2.986),i.updateMatrix(),o.setMatrixAt(5,i.matrix),this.add(o);const h=new p(e,P(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const f=new p(e,P(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);const u=new p(e,P(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const g=new p(e,P(43));g.position.set(-.462,8.89,14.52),g.scale.set(4.38,5.441,.088),this.add(g);const b=new p(e,P(20));b.position.set(3.235,11.486,-12.541),b.scale.set(2.5,2,.1),this.add(b);const _=new p(e,P(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){const e=new Set;this.traverse(s=>{s.isMesh&&(e.add(s.geometry),e.add(s.material))});for(const s of e)s.dispose()}}function P(m){return new Ee({color:0,emissive:16777215,emissiveIntensity:m})}const W={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class A{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ft=new Ae(-1,1,1,-1,0,1);class ct extends be{constructor(){super(),this.setAttribute("position",new fe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new fe([0,2,0,0,2,0],2))}}const dt=new ct;class ${constructor(e){this._mesh=new p(dt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ft)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class pt extends A{constructor(e,s="tDiffuse"){super(),this.textureID=s,this.uniforms=null,this.material=null,e instanceof y?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=j.clone(e.uniforms),this.material=new y({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new $(this.material)}render(e,s,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ge extends A{constructor(e,s){super(),this.scene=e,this.camera=s,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,s,r){const a=e.getContext(),t=e.state;t.buffers.color.setMask(!1),t.buffers.depth.setMask(!1),t.buffers.color.setLocked(!0),t.buffers.depth.setLocked(!0);let o,i;this.inverse?(o=0,i=1):(o=1,i=0),t.buffers.stencil.setTest(!0),t.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),t.buffers.stencil.setFunc(a.ALWAYS,o,4294967295),t.buffers.stencil.setClear(i),t.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),t.buffers.color.setLocked(!1),t.buffers.depth.setLocked(!1),t.buffers.color.setMask(!0),t.buffers.depth.setMask(!0),t.buffers.stencil.setLocked(!1),t.buffers.stencil.setFunc(a.EQUAL,1,4294967295),t.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),t.buffers.stencil.setLocked(!0)}}class mt extends A{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class gt{constructor(e,s){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),s===void 0){const r=e.getSize(new v);this._width=r.width,this._height=r.height,s=new H(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:k}),s.texture.name="EffectComposer.rt1"}else this._width=s.width,this._height=s.height;this.renderTarget1=s,this.renderTarget2=s.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pt(W),this.copyPass.material.blending=Re,this.timer=new Be}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,s){this.passes.splice(s,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const s=this.passes.indexOf(e);s!==-1&&this.passes.splice(s,1)}isLastEnabledPass(e){for(let s=e+1;s<this.passes.length;s++)if(this.passes[s].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const s=this.renderer.getRenderTarget();let r=!1;for(let a=0,t=this.passes.length;a<t;a++){const o=this.passes[a];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),o.needsSwap){if(r){const i=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(i.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(i.EQUAL,1,4294967295)}this.swapBuffers()}ge!==void 0&&(o instanceof ge?r=!0:o instanceof mt&&(r=!1))}}this.renderer.setRenderTarget(s)}reset(e){if(e===void 0){const s=this.renderer.getSize(new v);this._pixelRatio=this.renderer.getPixelRatio(),this._width=s.width,this._height=s.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,s){this._width=e,this._height=s;const r=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(r,a),this.renderTarget2.setSize(r,a);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(r,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class vt extends A{constructor(e,s,r=null,a=null,t=null){super(),this.scene=e,this.camera=s,this.overrideMaterial=r,this.clearColor=a,this.clearAlpha=t,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new L}render(e,s,r){const a=e.autoClear;e.autoClear=!1;let t,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(t=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(t),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=a}}const xt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new L(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class E extends A{constructor(e,s=1,r,a){super(),this.strength=s,this.radius=r,this.threshold=a,this.resolution=e!==void 0?new v(e.x,e.y):new v(256,256),this.clearColor=new L(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let t=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new H(t,o,{type:k}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const g=new H(t,o,{type:k});g.texture.name="UnrealBloomPass.h"+u,g.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(g);const b=new H(t,o,{type:k});b.texture.name="UnrealBloomPass.v"+u,b.texture.generateMipmaps=!1,this.renderTargetsVertical.push(b),t=Math.round(t/2),o=Math.round(o/2)}const i=xt;this.highPassUniforms=j.clone(i.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new y({uniforms:this.highPassUniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),this.separableBlurMaterials=[];const h=[6,10,14,18,22];t=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new v(1/t,1/o),t=Math.round(t/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=s,this.compositeMaterial.uniforms.bloomRadius.value=.1;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=j.clone(W.uniforms),this.blendMaterial=new y({uniforms:this.copyUniforms,vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,premultipliedAlpha:!0,blending:Fe,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new L,this._oldClearAlpha=1,this._basic=new De,this._fsQuad=new $(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,s){let r=Math.round(e/2),a=Math.round(s/2);this.renderTargetBright.setSize(r,a);for(let t=0;t<this.nMips;t++)this.renderTargetsHorizontal[t].setSize(r,a),this.renderTargetsVertical[t].setSize(r,a),this.separableBlurMaterials[t].uniforms.invSize.value=new v(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2)}render(e,s,r,a,t){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),t&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let i=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this._fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=i.texture,this.separableBlurMaterials[h].uniforms.direction.value=E.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=E.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this._fsQuad.render(e),i=this.renderTargetsVertical[h];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,t&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const s=[],r=e/3;for(let a=0;a<e;a++)s.push(.39894*Math.exp(-.5*a*a/(r*r))/r);return new y({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new v(.5,.5)},direction:{value:new v(.5,.5)},gaussianCoefficients:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new y({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}E.BlurDirectionX=new v(1,0);E.BlurDirectionY=new v(0,1);const V={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Mt extends A{constructor(){super(),this.isOutputPass=!0,this.uniforms=j.clone(V.uniforms),this.material=new Ne({name:V.name,uniforms:this.uniforms,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader}),this._fsQuad=new $(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,s,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ue.getTransfer(this._outputColorSpace)===Ie&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ze?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Le?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Oe?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===_e?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ge?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Qe?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ve&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const bt={__name:"HeroScene",props:{activeService:{type:Number,default:0},rtl:{type:Boolean,default:!0}},setup(m){const e=m,s=pe(null),r=pe(null),a=[6613471,15124123,11182591];let t,o,i,h,f,u,g,b,_,R,B,X,F,D,T,ee=!0,N=!1,U=!1,K=0,te=0;const Y=new v,se=new v,ie=[],ae=[],Te=n=>{const l=new st;return n.forEach(([c,C],w)=>w?l.lineTo(c,C):l.moveTo(c,C)),l.closePath(),l};function we(){i=new ve,h=new He(38,1,.1,80),h.position.set(0,.2,13),t=new ke({canvas:r.value,alpha:!0,antialias:!0,powerPreference:"low-power"}),t.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.25:1.6)),t.setClearColor(264978,0),t.toneMapping=_e,t.toneMappingExposure=1.05,D=new it(t);const n=new ut;F=D.fromScene(n,.04),i.environment=F.texture,n.dispose(),i.add(new We(6784400,.6)),_=new Me(a[e.activeService],65,22,2),_.position.set(-3,2.5,4),i.add(_);const l=new ce(15257514,4);l.position.set(2,4,-2),i.add(l);const c=new ce(11139583,3);c.position.set(-4,0,5),i.add(c),f=new Q,i.add(f),u=new Q,f.add(u);const C=new je({color:3695721,metalness:1,roughness:.24,clearcoat:1,clearcoatRoughness:.14,envMapIntensity:.85}),w=new z({color:a[0],emissive:a[0],emissiveIntensity:1.35,metalness:.3,roughness:.24});ie.push(w),[[[-1.85,-1.65],[-.42,1.75],[.12,1.75],[-1.18,-1.65]],[[-.05,1.75],[.51,1.75],[1.95,-1.65],[1.18,-1.65]],[[-.56,-.42],[.56,-.42],[.83,-1.02],[-.82,-1.02]]].forEach((x,d)=>{const M=new Xe(Te(x),{depth:.47,bevelEnabled:!0,bevelSegments:4,steps:1,bevelSize:.065,bevelThickness:.065});M.translate(0,0,-.235),u.add(new p(M,d===2?w:C)),u.add(new Ke(new Ye(M,28),new qe({color:d===2?14221305:10872803,transparent:!0,opacity:d===2?.55:.23})))});const J=new p(new xe(.065,2.7,.025),w);J.rotation.z=-.397,J.position.set(-.88,-.12,.32),u.add(J),u.rotation.set(-.14,-.36,-.04),g=new Q,f.add(g);const Ce=new z({color:10268335,metalness:1,roughness:.26,transparent:!0,opacity:.7});[2.65,3.05].forEach((x,d)=>{const M=new Q;M.rotation.set(d?1.1:.54,d?-.5:.64,d?.48:-.26),M.add(new p(new de(x,d?.009:.014,6,160,d?Math.PI*1.65:Math.PI*2),Ce));const ue=new p(new Je(d?.065:.09,16,12),w);ue.position.set(x,0,0),M.add(ue),g.add(M),ae.push(M)});const le=new p(new Ze(2.8,2.8,.12,96),new z({color:132873,metalness:0,roughness:.95,envMapIntensity:0}));le.position.y=-2.65,f.add(le);const Z=new p(new de(2.7,.012,6,128),w);Z.rotation.x=Math.PI/2,Z.position.y=-2.57,f.add(Z);const G=new Float32Array(180*3);for(let x=0;x<180;x++){const d=x*2.39996,M=3.7+x%13/5;G[x*3]=Math.cos(d)*M,G[x*3+1]=Math.sin(d*1.7)*3.7,G[x*3+2]=Math.sin(d)*M-3}const he=new be;he.setAttribute("position",new $e(G,3)),b=new et(he,new tt({color:11003102,size:.022,transparent:!0,opacity:.6,depthWrite:!1})),f.add(b),o=new gt(t),o.addPass(new vt(i,h)),o.addPass(new E(new v(1,1),.2,.4,1.7)),o.addPass(new Mt)}function q(){if(!t)return;const{width:n,height:l}=s.value.getBoundingClientRect();U=n<760,t.setSize(n,l,!1),o.setSize(n,l),h.aspect=n/l,h.updateProjectionMatrix(),f.position.x=U?0:e.rtl?-2.9:2.9,f.position.y=U?-1.9:0,f.scale.setScalar(U?.77:1),O()}function O(){if(!t)return;const n=N?0:te;Y.lerp(se,.035),u.rotation.y=-.36+Math.sin(n*.23)*.16+Y.x*.12,u.rotation.x=-.14+Y.y*.08,u.position.y=Math.sin(n*.65)*.12,g.rotation.y=n*.055,g.rotation.z=Math.sin(n*.13)*.08,ae.forEach((l,c)=>l.rotation.z=(c?.48:-.26)+n*(c?-.09:.07)),b.rotation.y=n*.012,o.render()}function re(n){X=requestAnimationFrame(re),!(N||!ee||document.hidden||n-K<(U?40:24))&&(te+=Math.min((n-K)/1e3,.05),K=n,O())}function oe(n){N||se.set((n.clientX/innerWidth-.5)*2,(n.clientY/innerHeight-.5)*2)}function ne(){N=T.matches,O()}return me(()=>e.rtl,q),me(()=>e.activeService,n=>{const l=new L(a[n]||a[0]);ie.forEach(c=>{c.color.copy(l),c.emissive.copy(l)}),_==null||_.color.copy(l),O()}),rt(()=>{T=matchMedia("(prefers-reduced-motion: reduce)"),N=T.matches;try{we(),q()}catch{return}R=new ResizeObserver(q),R.observe(s.value),B=new IntersectionObserver(([n])=>{ee=n.isIntersecting}),B.observe(s.value),window.addEventListener("pointermove",oe,{passive:!0}),T.addEventListener("change",ne),X=requestAnimationFrame(re)}),ot(()=>{cancelAnimationFrame(X),R==null||R.disconnect(),B==null||B.disconnect(),window.removeEventListener("pointermove",oe),T==null||T.removeEventListener("change",ne),i==null||i.traverse(n=>{var l,c;(l=n.geometry)==null||l.dispose(),Array.isArray(n.material)?n.material.forEach(C=>C.dispose()):(c=n.material)==null||c.dispose()}),F==null||F.dispose(),D==null||D.dispose(),o==null||o.dispose(),t==null||t.dispose()}),(n,l)=>(lt(),nt("div",{ref_key:"container",ref:s,class:"hero-scene","aria-hidden":"true"},[l[0]||(l[0]=S("div",{class:"scene-aura"},null,-1)),l[1]||(l[1]=S("div",{class:"scene-grid"},null,-1)),S("canvas",{ref_key:"canvas",ref:r,"data-testid":"hero-webgl"},null,512),l[2]||(l[2]=S("div",{class:"scene-caption"},[S("span"),ht("AMROTECH / IDEAS ENGINEERED "),S("b",null,"01 — ∞")],-1))],512))}},Ct=at(bt,[["__scopeId","data-v-a6bd533a"]]);export{Ct as default};
