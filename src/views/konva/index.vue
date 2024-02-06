<script lang="ts" setup name="custom-layout">
import { onMounted, ref } from 'vue'
import Konva from 'konva'

let stage: Konva.Stage
let layer: Konva.Layer
const transformer = new Konva.Transformer({
  enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  rotateEnabled: false,
})

onMounted(() => {
  // first we need to create a stage
  stage = new Konva.Stage({
    container: 'container', // id of container <div>
    width: 500,
    height: 500,
  })
  // then create layer
  layer = new Konva.Layer()

  layer.add(transformer)

  stage.on('click', (e) => {
    if (e.target === stage) {
      transformer.nodes([])
    }
  })

  // add the layer to the stage
  stage.add(layer)
  // draw the image
  layer.draw()
})

// 生成边框
// const generateBorder = (selectedShape) => {
//   // 删除之前的边框，以确保只有一个边框存在
//   const borderArr = layer.find('Rect')
//   borderArr.length && borderArr[0].destroy()

//   const boundingBox = new Konva.Rect({
//     x: selectedShape.x(),
//     y: selectedShape.y(),
//     width: selectedShape.width(),
//     height: selectedShape.height(),
//     stroke: 'red',
//     strokeWidth: 2,
//     draggable: true,
//   })

//   boundingBox.on('dragmove', () => {
//     // 当拖拽时，更新底层形状的位置
//     selectedShape.position({
//       x: boundingBox.x(),
//       y: boundingBox.y(),
//     })
//     layer.draw()
//   })

//   boundingBox.on('transform', () => {
//     // 当缩放时，更新底层形状的大小
//     const scaleX = boundingBox.scaleX()
//     const scaleY = boundingBox.scaleY()
//     selectedShape.width(selectedShape.width() * scaleX)
//     selectedShape.height(selectedShape.height() * scaleY)
//     boundingBox.scaleX(1)
//     boundingBox.scaleY(1)
//     layer.draw()
//   })

//   return boundingBox
// }

// const generateDot = (selectedShape, boundingBox) => {
//   const controlSize = 10 // 控制点的大小
//   const controlTopLeft = new Konva.Rect({
//     x: boundingBox.x() - controlSize / 2,
//     y: boundingBox.y() - controlSize / 2,
//     width: controlSize,
//     height: controlSize,
//     fill: 'red',
//     draggable: true,
//   })

//   const controlTopRight = new Konva.Rect({
//     x: boundingBox.x() + boundingBox.width() - controlSize / 2,
//     y: boundingBox.y() - controlSize / 2,
//     width: controlSize,
//     height: controlSize,
//     fill: 'red',
//     draggable: true,
//   })

//   const controlBottomLeft = new Konva.Rect({
//     x: boundingBox.x() - controlSize / 2,
//     y: boundingBox.y() + boundingBox.height() - controlSize / 2,
//     width: controlSize,
//     height: controlSize,
//     fill: 'red',
//     draggable: true,
//   })

//   const controlBottomRight = new Konva.Rect({
//     x: boundingBox.x() + boundingBox.width() - controlSize / 2,
//     y: boundingBox.y() + boundingBox.height() - controlSize / 2,
//     width: controlSize,
//     height: controlSize,
//     fill: 'red',
//     draggable: true,
//   })

//   const controlPoints = [controlTopLeft, controlTopRight, controlBottomLeft, controlBottomRight]

//   controlTopLeft.on('dragmove', () => {
//     const x = controlTopLeft.x() + controlSize / 2
//     const y = controlTopLeft.y() + controlSize / 2
//     const width = Math.max(controlTopRight.x(), controlBottomRight.x()) - controlTopLeft.x()
//     const height = controlBottomLeft.y() - controlTopLeft.y()

//     controlBottomLeft.position({ x: controlTopLeft.x(), y: controlBottomLeft.y() })
//     controlTopRight.position({ x: controlTopRight.x(), y: controlTopLeft.y() })

//     selectedShape.position({ x, y })
//     selectedShape.size({ width, height })

//     boundingBox.position({ x, y })
//     boundingBox.size({ width, height })
//     layer.batchDraw()
//   })

//   controlBottomLeft.on('dragmove', () => {
//     const x = controlBottomLeft.x() + controlSize / 2
//     const y = controlBottomLeft.y() + controlSize / 2
//     const width = Math.max(controlTopRight.x(), controlBottomRight.x()) - controlBottomLeft.x()
//     const height = controlBottomLeft.y() - controlTopLeft.y()

//     controlTopLeft.position({ x: controlBottomLeft.x(), y: controlTopLeft.y() })
//     controlBottomRight.position({ x: controlBottomRight.x(), y: controlBottomLeft.y() })

//     selectedShape.position({ x, y: controlTopLeft.y() + controlSize / 2 })
//     selectedShape.size({ width, height })

//     boundingBox.position({ x, y: controlTopLeft.y() + controlSize / 2 })
//     boundingBox.size({ width, height })
//     layer.batchDraw()
//   })

//   // controlPoints.forEach((controlPoint) => {
//   //   controlPoint.on('dragmove', () => {
//   //     const x = controlTopLeft.x() + controlSize / 2
//   //     const y = controlTopLeft.y() + controlSize / 2
//   //     const width = Math.max(controlTopRight.x(), controlBottomRight.x()) - controlTopLeft.x()
//   //     const height = controlBottomLeft.y() - controlTopLeft.y()

//   //     // 更新边框的位置和大小
//   //     boundingBox.position({ x, y })
//   //     boundingBox.size({ width, height })
//   //     layer.batchDraw()
//   //   })
//   // })

//   return { controlTopLeft, controlTopRight, controlBottomLeft, controlBottomRight }
// }

// const handleAddFont = () => {
//   const text = new Konva.Text({
//     x: 0,
//     y: 0,
//     text: 'test',
//     fontSize: 18,
//     // fontFamily: item.fontFamily,
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//     fill: 'black',
//     draggable: true,
//   })
//   text.on('click', (e) => {
//     const selectedShape = e.target

//     const boundingBox = generateBorder(selectedShape)
//     const { controlTopLeft, controlTopRight, controlBottomLeft, controlBottomRight } = generateDot(
//       selectedShape,
//       boundingBox
//     )
//     layer.add(boundingBox)
//     layer.add(controlTopLeft, controlTopRight, controlBottomLeft, controlBottomRight)
//     layer.draw()
//   })
//   layer.add(text)
// }

const handleAddFont = () => {
  const text = new Konva.Text({
    x: 0,
    y: 0,
    text: 'test',
    fontSize: 18,
    // fontFamily: item.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: 'black',
    draggable: true,
  })
  layer.add(text)
  text.on('click', (e) => {
    // clickInd = !clickInd
    // if (clickInd) {
    transformer.nodes([text])
    // } else {
    //   transformer && transformer.nodes([])
    // }
  })
}

const handleAddPng = () => {
  const image = new Konva.Image({
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    image: undefined,
    draggable: true,
  })
  // 创建一个图片元素
  const imgElement = new Image()
  imgElement.onload = () => {
    image.image(imgElement)
    layer.batchDraw()
  }
  imgElement.src = `data:image/jpeg;base64,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
q8oq9Gp9aPVP6pRZGl2MXbGxqMY1+jWe790vwW9vXo5H/cYO31U2/fH8UZX3JO1Rue+fD+Erm56J
ulpYKeR/qRzUeVGRqOZi120z6T9Vzb/UsLcdIyqVpKxuftQ3ftp0fajO65BYAresY7D60FRIuvWU
880b2+hjnKz+qZ7HK7UqV279LnrjT+3dLnJTTbsPF0rT1V9+1Yd76Kdql3SWXEVbS7W9mGvgbOrn
fjt2aJ+S4u8blvs2UyrP1V/tr/kqsnkbXb/p7v10/GnuRfiLo9Y5sDHyx2+K7QMajnSWyTrF1+ak
bkbIq+hqmwYnKXTcr/yblf1uj8vtUOVyez8bjb3qfq9P5/YjCrpKigqpKWrglgqYnbXwzMVj2L5F
auioX2yu3ZVR7abNtHUiqxUXXtJ5F5es4GSeVHTbzLy5kgpbtW/utsjV0dS3WRfCGprquyp0VyLy
Tt9YiInBEAz+yd6TuX2djY6WzXFaDECorn2a4okdTwRddmi7ZU0aq9hVVG+MjQJpAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFWc2feDsi7G2sxFWdZcZ2r4HaqVUdVVS680RV7L
NddXu4cNOK6NUNYeePScxtnlWS09wqVtmGEfugslHIvVIiLq1ZXcFmemicXcNU1a1uoEJATlk90U
sxs4vB62gti2nDsm13vxdEdFE9vDjE3TdLw10VqbdU0VzQM68sOgrljgJKervsEuLbzEqOWW5ptp
Ucmvi0zV2qioqatkWTkBkvQ0VNbKWGjoqeGmo4WoyKCBiMZGidzWomiIB6gPironPghxw4Fa7OK2
7hjWzUGrVqvCJUTiynTf9fi/Wavn8sdJwuiV3fl3Q6ft8n+ZY2dJyr3mbKela1XmbVPRUo6GONPn
TuVyr6k0NNy/lGvyru4tmlKd8q7fsps2fat7WgW6/pLm31LfqsXXutRUfcpGN7kh0j/3dFNXy+Ve
r5WyksitKfq9X+nZVZWtLxLf/j+vpUeWR1S7fLI+R/znqqu+sor1+7env3K1lX012p9uNI06tNgi
InJCMyBwOuaKOdmyZEkZ5HpqZITlGvUcRrWnkqPVYXpJ9Vgc6nd9Hi32KTreo3I+V0p1vUbsfK6y
366y1lBqr2b4k+WzinrLGzmWbvoqsrOZbu8OK18RYWsmLaVKW+Wylr4mt2sWoZ8ZHr8x6aOZ6lLj
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
X1izSwdcsMYjpFqLZXN0VzFRssL08WWNy67XtXii6KncqKmqKGoHOzJHEWRmMJbHe2eEUc2sluuc
TFbDWwovFyJ8l7dURzObV71arXOCzsI4tveBsQ0F/wAO3KW3Xihf1sFRCqbmLyVFReDmqmqK1eDk
XRUVNQNpXRz6XmHc6YaWy3fqLJjjq03Uau0grVTxlp3OXn8rq3LuROW9EVwGSDmtlarXIjmuTRWr
xRUOtaUlTZXppU4dNETYtwm+xyrVUqOdbXr6VgVf1eRTxPlZyUnpc5ZWNHesy/k9FfR3V/dl0+Vu
WmanHKjzV3y/vWuaGuwAAAAAAAAAAAAAAAAAAAAHmrq6G3QpLULonyWpzcvmJFm1K/Lcg72rUr0t
yCyLjcZblUJJKmiJ4jG8moX+Pj0tR6i/x8eNiO5BZOOcwrFl7bPC7zUayytVYKKDRZ6pfM3uZ5Xr
w/K7JdabpWVqVzdx49HbXsj8fRQNT1bH06G9dr1uynb8fHcw6zFzLvWZVzbU170p7fA5W0duhcvV
U6L3/SevNz15+ZEa1PVdI0fH0u3u2emVeMu2v5ej86vL9R1K/n3udu+ynctaz2avxDdaO12ujmrK
+sekUFPA3c6Ry8kT9vcWF+/axrUr9+W7GPGqDGFZ13Y9NWxDJDJihyjw85sqx1eJa9jVuFanFGpz
SCNV/i0Xmvy149zWt8F5T8pLmtZHU6tmHk0/ul+t/T9da7ppmBTEt7ZeVXinrCmEn3yVKqqRzLa1
3oWdU/V5VJ3JTkpPU5+FZPRZp/N6Kejvr+7Hp21jj1PU44seateX9yWmxtiYjGI1rWpo1qcERD22
kaQpSlOilGnca71Xcd3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACyMzcrsM5u4UqsN4pofCaK
ftRTM0bPSSoi7ZYn6Ltenl4ouqtVHNVWqGp7Pfo5YsyJu6sucXh+HamVWUV7p2bYZV4qjXpx6uTR
FXYq8dF2q5EVQIda5Y3I5qq1zdFRUXRUXmiooGY+RfT1xBg2OCyZhw1OI7M3sMucbkW4QN0+Vu4T
prp4ytdxVVc7ggGwTBGYeEs0LK65YVvlDercqI2RIXdqPVF7MsbtHMVdNdrmouh0lGkqVpKm2lTb
WldtFAxNgJ8G6rtG6SLmtN4zmfi+VPMeT8o+Q8rO9k6dTej2w7afs9/q4/tbejaNP1qMvF5XHv8A
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
AAAAAAAMUvdBcQz2bIZlvhc1Evl3pqSZF5rExJJ9U9D4WAargNz3Rcw83C/R7y8oGv3pNbGV+vnq
XLUKnq67QCUrm7bSP86ohFy67tlmx6eMUUp1gpOJr9T4Uw1fL/WRPmpbPQ1FwliZ2XPbFG+RzW+l
GmS3Cs583R0nLchtadMyM0MT5s4iqL3im5y1U8jnOhp9ypT0bV0+Lhj1VGMTROXFdNVVy6qt3CEY
R3Yq6Va14sm+g7ndiGPGtPltdrhUXGx3GnmdbmVD1e6gmhjWRWscq9mJ0cb+xy3bVTbq7WNmWYyj
zkeNGWxcrGWxsGKpPDgUvEt+p8KYcvl/rI3y0lnoZ7hLEzg57Io3yOa31NMluNZy5ujpOW5Da05Z
kZoYnzZxHUXzFFzlqp5HOdDTo5Up6Nqr/g4Y1VUYzgnDmumqq5dVW7hCMI7sVbKta8WTfQdztxBF
jWny2u9fPcbFcaeZ1ujqHK91BNDGsitY5V7MTo439jlu2qm3V2sbMsxlGtyPGjNYuVjLY2DFSnvH
dY+utlUn0N3s4nS7HqyZseW7eis8r16wd6d1jdBinBt900ZW26Wh2p5YJd6r7KhPYX+jT8VKLXNY
jsvUkxhwpf58J4osl+pkVam0V0NdEnldFI16f7pbV6abFVToq3ePWN71fE5ron8WObyVNNUU17o7
FpHbs6VTtL9WzM+aqO9v/sWOn+TKKHlU60VVLBGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAa+fdK74x9dl5Y2SO3xRVtZNF3Kj1iZG70pskAwRoKGe511LQ0zFkqaqRkMTPK9yo
iJ7VA30Wu2wWe20VupI+rpKKFlPCzXXRjGo1qexAPPd3fExp5Xa+xCBnV6sUnGp1lLKxNeK7Wqjv
9nuNouEXW265U8tHUxNXbuikYrHp+a45jLcnvus47abGq7MnomZmZf36po6HDlzxLaVkclJcrNSv
qEmj4KjnxM3OidovFrk0112q5NHLeWr8blOjoV0rdYcWRfQ76MWIcC4kfj3GtD721kNO+C1W2RUW
oa6Ru188iNX4vsOcxGrxVXO126N3RMvIpu7sGazart3pM0yuTQ4Hiu9qo79abhaLjF1ttuNPLR1M
SLtV0UjFY9PzXHaMtye+6zjtpsarsyeiZmZl/famjocOXPE1pWRyUlys1K+oSaPgrXPjZudE7ReL
XJprrtVyaOW7tX43KdHQrpW6w4si+h90YsQ4GxK7H2NaFLbWQU74bVbZHIs7XSN2vnlRq/F9hz2I
x3a1c7XbtbuiZeRHd3Ys1m1XbvSZplcmuKsSVNi+K5FRfWdacTbu1WEicNHeMiFbRslWNPTdsjK7
Ku03Zse+otd2Y1XfMimiej/67Ii00ie7elHvoptYjthGVOyrX8bC15uWyNvjcR5MYCubXrI+Wy0s
Ur3c3SxMSJ6r+VG4pMmmy5Kqws12xpRJlqfpUOTys+wzYNfGOmVTqq4WqEAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1he6NuVc7cPt1XamG4NE/+6qv2IBj5kdE2bOnLeKRu6N+
I7c1zV5Ki1UfADeABSbvzp/X+ors/wA1KxfOU0rkxy2O012rp5dBtNtHEOWNHSn6TtwyMr8P2TDl
vt1bfrhEtdUe+Ucr4oabcrGbUY9mrnPY/wCV2Uj5drhOxcal2m/NEvXqxrsox1+EJzM/kDBv9Dqf
7wSfALXpYfCJnwhOZn8gYN/odT/eB4Ba9J4RM+EJzM/kDBv9Dqf7wPALXfU8Imyu6MOfc2e+E7pV
XOkpaHEVnqWw1kFE16QOjkRywyMR6uVqu2vaqbncY9eG7Qh5WPSzXbTgkWbu/TZWvx8finCSRkTH
Oke1rG83OdohFSOmvkuFPUw1LXOgqI5mpzcxyL9hxKkoOZW62/Kjuu9OaHPa4qsSdNJ50+mv2lbX
ymwW/JihjpUxtk6P2M3OTVY0o5Gr5F8Mgb9jnEzTa7cqPx5qBqldmNX01/Ha1lGztYbZeh5x6NmB
eGujK1FX0V9Qv7Sozq+OrTuonY3ke1PNvX+Gxev7Dpi/pYu1/wDRrgLpXgAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAANZvukFtmizZwtcnIng9RYm07fxo6iZzvqlaBjHlZeYcN5n
YKvNTwprbeqKqlVe5sc7Hu+wDecBSrunGBfSn2Fdn08lKxfOW5e6ySgtNXUwr8YxOyvzVVUTX1ak
K1HekssW1G7ehCaNOtk8I67r3+Ea69Zqu72lhsjtbZuR3dzd6qS7HWPr7XSVM3+Eena+kqKqa+vQ
r7sd2TU8q1G1enCDAL3QjCNxpsdYZxX1L3Weutjbf13FyR1EUkj1Yq6cNWSNVvHtaO+apZYMvF7q
qyKdfax+wzljUXulgra6qWlpZkRzGMZuke1eS8eDUXuUgZutQx5yt2o7a0b7yf5AX9SsRy8q7zcJ
dNKcZVp3+j+ZdCZP2Ll4Vcmr5VkYqezYVX/EOV9GP2+9uH/LLSfNu3P4of4LIxXl7WYdg8LhmSqo
UcjXPRm10Squibk48POXeDqtvKlzUo7smg8peRWVo0PCYS5yz37Nlaeun4/czP8Ac9MJXG3YYxni
epifFbrvUU1JRucqokvUJKsrkTvRFka1HeVHJ3KZM6fTGLU8anayXxvPKtVSU+rkp0Zv07nO1VPq
MONRtGjxpuzn2qTYZpYL1RLCq9p6McnzmrzM12nVTs+EZ406SSc1NXInnK+jVa8FhPf1kjnfOVXe
1SrbDGO5HYhbpYV8VFkHimKRdHVz6OmjT6XhMUn+7E4sNLpsyIq7VenHr8fHFrONlay219Eallo+
jjgSKZm174KqRE+i+sqHtX81yKVGZOlbvR3J+N0Q9qc7en8Ni9f2HTE/Sxc3/wBGuAuleAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwf90kwy+rwXgfErZexbbhPQPYic/CI0ejt
fIng2n5QGuJFX2gbxMnscszKyvwnipJYpZrpb4pKh0SaNSoRNszET6MrXt9QF1XRiLS6/Mci/qIm
bHets2PXxigzxR1ELoZW745G6OTzKVNJbqxjKtJb0Vs/uHpuv/xyTqNfE2pr+d/yJHhMlr88Xd3y
On47PzXNFFHTQtiiTZHG3RqeZCPKqqlKspb0lHxjg2x4+w5W4dxHbo6+z1iaSQv7Ko5PFexycWub
3Kh2t3JRlvwYpwjPymI2JeiNjrCb3pgW/W3EVjjTWK33ly01bEmvCNsrUSN+ifKds/FQ6XsXFyq7
0urP0No0nllqel242ZUpdt04Ulxp6q++ldnCi0kyYztXRP3sIm6ppufiOiVE8+iPI1NGt/738rZv
+aM+zDr/AB/+i/cJ9Dy/4jqo5szL/SwWdr2vWxWBz/j9OKNlqHom1NeCtYjte5WuJmPYx8WlJWI7
0u+rUda5VajrUeauypC39GP4141+7tZd2y2UNkttLbbZRw0Vuo40ip6WnjRscLE5IiIdZS31DGOx
8uNrpbnC2KoZrt4tc3grfQpzCco+QkWMi5ZlvweW2YfobTL10KPfPySSV2qt9HI7zuSk738y9eju
S4PdWTLT0dRKnyWLp6e4wSruxYbUN65GCy0TREQrmwsSenViiOnwxhTC0asdNXVklzlai9qNkTFj
jX0OWaVP9EXOkW+mV1Q6zc8m2wd/9cC8UbddlzhuXBuXmEcOVDGMqrTaqWknRi8OtZExJFT0v3FF
ervSnKiytU3Yr0tTNahz/I37SRhR23N5iyq9VWi1QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAEZ5+5ePzVygxbhWBqLXVdL1lGiKia1MStkiarl4NRz2Naq/NcoGlFUdGqoqaOT
gqKnJe9NAM+vc8s4Y2MuWV91qWtke91xs/WO8fs6zwpq7u2pIjUT/LKqgZ+SxJLG9i8nJodJR3o7
pGu7LeW05Fbqi804KUFabtFtSr6cgcAHIcuA4AOQOAABQ8R1XVwR06Lxkdud6E/5mDJn1dxOwbe9
PfW297I43ySyNihjarpHvciMjaiaqqqvJEQielZ16GrjPnMlc08zLrfIHyLaYttHbWvRezSx6o1d
F8Xcquk29yvU2zFscxZjDtahlXufu1n2Kr0YMvH5k514Ytr4ettlvnS6XBVZuYlPAqPVHp817tkf
pkQ75Fzm7cqsMI7023Nzlc5XLzVdVKNaUps6FVtcOyBz3c5F+pC0wIbtvf70DJnvS3VSJrAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAar+nFklNl1mRJi+2U0iYaxVM6oc9GOV
lNXL2pY1Xjpv4yN5c3o1NIwMZLJerhhu8UV3tNVJR3OgmbUU9RGqI6KRq6o5P2AbdOjf0lrJn3h5
I3LBbsZ0MaLcLVv0R6Joizwa8XRKq8uKsVUa7m1zgl26U6Ry9cniO5+kqs21uy303Gub0d14SEkh
yAAAAAAAOD5WxMWV7tGMTcqnFalKb1d1ZlVUPuFU6VEXV/iNTmiIV8570l9at0sw3asK+lT0iqWt
o6vAWD65lRDMuy63Onfqx7e+micnNF+W5Ofict2t1p2DueNuexSajnVnXmbftYZlwpmz3oX5NPy5
y9fiS70yxYjxUxlRte1N1LRt4ws1Xkr9esdx/wAmiojmlXmXd+u52UTMe3sptZNxwunkSJvNSJbh
O5LcSZT3Y7y4msaxqNTkiaIXtKbI7qrrXa7Ds4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAALSzEwBY8z8IXTC2IaZ81suEe12zRr4n82Sxr3Pa5NU+tFTgoaf8AO/JLEeReL32W
9RLPQTK99tukbFbBXRNVNXImq7Xpqm9murVVObVa5wR5arrX2O4U9xtlbU0Nwpno+GqpZXRSxOTk
rXtVFavoAy9y890KxnZaTwDGtkosTwoiNSshkSiqkVV1VXbWujfonBERjOXFVOs4UlTdk5pXdrvJ
ap/dBss5ImOqLBi+KX5TI6amkb7evb9hXeATrxmleFbOx3fCCZWfyNjP+g0v95O3zf6afV+Z4V6D
4QTKz+RsZ/0Gl/vI+b/TT6vzPCvQfCCZWfyNjP8AoNL/AHkfN/pp9X5nhXoPhBMrP5Gxn/QaX+8j
5v8ATT6vzPCvQfCCZWfyNjP+g0v95Hzf6afV+Z4V6D4QTKz+RsZ/0Gl/vI+b/TT6vzPCvQfCCZWf
yNjP+g0v95Hzf6afV+Z4V6FtYt6f+EJ4Gx2LC1/q9F3Kytkho0VfOrXS8PUYbmmTuV2VlTdSLOdC
1Te3a1kxqzS6UWOMyqaotiTw2SwTt2SUFt1aszfJLKvbfz4om1i/NJePgWbHWp01YMjOvXuivRRB
xMQ2X3RK6Lk2N66jx1jGgVuE6Z6S0NDUs/8AikiLqiq1ecKL+fy5biJk5HN9WPFntW9+u2vx8fHp
2Mucrlcqrqq8eJU1r21T6U2dCsUFIlMxXP8A8I76kLbFsVtx3p8Vffvb/qe8lsIAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWxjfAmHcx8PVGH8U2mnudqnVHLDNrqxya6PY5
NHMem5dHNVF4r5QNembvuf2LMNyTV+XtYmJLTruShqXshrok4966Ry6InNFa5VXRGAYk37DV7wpX
eAX6z3G016JuWnuFM+CTTuXa9EUCkgAAAAAAAAAF84Hygx3mVI1uFcK3K5xOcrPCo4tlM1U5o6d+
kbfynIdZ3IQ8qTmMa14M2skugxacK1NNfMxqmlvtxhe2SKzU+q0Mbk1VOtc5EWdeXY0RnPXe1SBe
zq16lpJt49fOZjQ08szU6tmjEajU4bWoicERCFCxO5TqRSJXIw6FWpLeyn7S9qTy9yegtLGLG3Xe
7UO5elN7yUwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPLW0FLcqV
9LXU8NVSypo+GeNHsennaqaAWVJkflhM90kuW+DXvdxVzrJTKq+vYB8/eKys/mzwb/sKl/sAP3is
rP5s8G/7Cpf7AD94rKz+bPBv+wqX+wA/eKys/mzwb/sKl/sAP3isrP5s8G/7Cpf7AD94rKz+bPBv
+wqX+wA/eKys/mzwb/sKl/sAeu2ZQ5e2WoSqtuA8LUNSnKaltFPE9PymsRTitKSc0qu+SKOTTfHG
7TluaimPm4fRoUnWnCo2CJvixxp6Goc0twp5ptq7jI4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAYrZ69NvDeTuKJcL22xT4kvdHtSu6uqSmp6VzkVUj6zY9XvRFTVEbtTXTduRzUCKfhN
PwX/AKf+7APhNPwX/p/7sA+E0/Bf+n/uwH1vumKbk3ZX9lF4ql/RVRPN/BuIGX2UebWHs68Hw4nw
5JP4IsrqeanqGI2WmmaiKsb0RVTXRzVRUXRUcgEgAYp559ODDWUWKpsL2mxy4nu9C7bXujrEpqem
eqa9X1mx6vkT5SI3Ruumu5HNQIs+E0/Bf+n/ALsA+E0/Bf8Ap/7sA+E0/Bf+n/uwD4TT8F/6f+7A
PhNPwX/p/wC7APhNPwX/AKf+7APhNPwX/p/7sA+E0/Bf+n/uwD4TT8F/6f8AuwD4TT8F/wCn/uwD
4TT8F/6f+7APhNPwX/p/7sA+E0/Bf+n/ALsA+E0/Bf8Ap/7sA+E0/Bf+n/uwD4TT8F/6f+7APhNP
wX/p/wC7APhNPwX/AKf+7APhM/wXf/sH3YDJPo/9JHDfSAtda+2089svlt2LW2upej3Ma7XSSN6a
JIzVNuujVRU4tTc3cE2AAMU88+nDhrKPFc2F7RY5cT3ehXbXujrUpqemfpr1aSbHq+RPlIiaN101
3I5qBFnwmn4L/wBP/dgJ16PHS0w3nzWVdlW11FhxLTxeENoJp/CI6iFFRHOjl2t3K3VNzVai6Lqm
7RytC1s6+nNhrKrFlVhqzWKbE9zt0iw1721raWngkTxo2v2PV72rwcm1EavDXXVAIz+E0/Bf+n/u
wD4TT8F/6f8AuwHdS+6XwOqI0qss5YqdXdt8V7SR6J5UatO1F9qAZlZdZhWTNLCNsxVhyd81ruDF
c1JWKySJ6LtfHImq6Pa5FRdNU72qqKigXeAAAAAAAAAAAAAAAAAAAAAAAAAAAABp76WWVeIsvc4M
VXK5UFQtlxBcp7lQ3Jsa9RMk73SrGjuSPYqq1WrovZ3abXNVQgUAAA5tRXqjUTVVXg1O9fIBtL6C
GVWIMucur1ccR01XbqrEFYyaC31LVa+KGNujXuYvFjnq53BeOjWr3gZYAadulZlfiLLzODFNddKC
f3rv1zqbhb7i1irBUMmkdJsR/Lezdtc1ePDXkrVUIKAAAAAAAAAAAAAAAAAAAABy1Az19zxyrxHb
cQ3zMC4UE9DYqi2LbqJ1TGrFrXSSRSufHrxVjUhRN3JVfwVdrkQNg4ADTv0q8rsRZd5vYqrrrb50
tV+udRcKC4ta5YKhk0jpNiP5b2btrmrx5ryVqqEEgZddA7KvEd6zatmO0t89NhmwxVDnVs0StjqZ
ZIZIUiicvjKnWK9ypqjdui6K5uoRb0l8rMTZbZqYkfeqCp97brcqmroLkrXLDVxySLIidZoiK9Ec
iPbzRfKmiqELgAPRTUs1ZUxU9NFJPPK5GRxRtVz3uXkiNTioG2roXZY37K/JeOjxJTPo7ld7hLdV
opk2yUsb44mNY9O5yti3q3gqbtrkRUVAMjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAf/Z`
  layer.add(image)

  image.on('click', (e) => {
    // clickInd = !clickInd
    // if (clickInd) {
    transformer.nodes([image])
    // } else {
    //   transformer && transformer.nodes([])
    // }
  })
}

const handleGetData = () => {
  console.log(layer.getChildren().filter((item: any) => item !== transformer))
}
</script>

<template>
  <div class="container-wrap w-[502px] border-[1px] border-black border-solid">
    <div id="container"></div>
  </div>
  <div class="btn-wrap mt-[20px]">
    <el-button @click="handleAddFont">添加文字</el-button>
    <el-button @click="handleAddPng">添加图片</el-button>
    <el-button @click="handleGetData">获取列表数据</el-button>
  </div>
</template>
