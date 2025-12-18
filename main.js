title = "SATELLITE HOPS";

description = `
[Slide] Move
`;

// ドット絵のキャラクターを定義
characters = [
`
 GGGG
 G  G
GGGGGG
  GG
 G  G
G    G
`
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 20,
};

/** @type {{x: number, z: number, size: Vector, color: Color}[]} */
let pillars;
let nextPillarTicks;
let nextYellowPillar;
let pos;
let vy;
let multiplier;
let hops;

// 背景の星を管理するための変数を追加
let stars;

function update() {
  if (!ticks) {
    pillars = [{ x: 0, z: 20, size: vec(100, 100), color: "yellow" }];
    nextPillarTicks = nextYellowPillar = 9;
    pos = vec(50, 10);
    vy = 0;
    multiplier = 1;
    hops = 0;

    // 星を3D空間に初期化
    stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: rnds(100), // 3D空間のX座標 (-100 ~ 100)
        y: rnds(50),  // 3D空間のY座標 (-50 ~ 50)
        z: rnd(1, 100)  // 奥行き (1 ~ 100)
      });
    }
  }

  // --- UI表示 ---
  color("black");
  text(`Hops: ${hops}`, 3, 10);

  // --- 背景の星を奥から手前に移動するように描画・更新 ---
  stars.forEach((s) => {
    // 星を奥から手前に移動させる
    s.z -= difficulty * 0.1;

    // 星が手前に来すぎたら、奥に再配置する
    if (s.z < 1) {
      s.x = rnds(100);
      s.y = rnds(50);
      s.z = 100;
    }
    
    // 3Dプロジェクションで画面上の座標と大きさを計算
    const screenX = s.x / s.z + 50; // 画面の中心を50,50とする
    const screenY = s.y / s.z + 50;
    const size = (10 - s.z * 0.1) * 0.2;

    // 画面内の星のみ描画
    if (size > 0 && screenX > 0 && screenX < 100 && screenY > 0 && screenY < 100) {
        color("light_yellow");
        box(screenX, screenY, size, size);
    }
  });

  // --- 足場の生成ロジック ---
  nextPillarTicks--;
  if (nextPillarTicks < 0) {
    nextYellowPillar--;
    pillars.unshift({
      x: rnds(60, 160),
      z: 20,
      size: vec(rnd(50, 100), rnd(70, 180)),
      color: nextYellowPillar < 0 ? "yellow" : "black",
    });
    nextPillarTicks = 20 / difficulty;
    if (nextYellowPillar < 0) {
      nextYellowPillar = 9;
    }
  }

  color("light_black");
  rect(0, 60, 100, 1);
  
  pos.x = clamp(input.pos.x, 6, 93);
  pos.y += vy;
  vy += 0.1 * difficulty;

  color("green");
  char("a", pos.x, pos.y).isColliding.rect;

  if (pos.y > 95) {
    play("explosion");
    end();
  }
  
  pillars = pillars.filter((p) => {
    color(p.color);
    if (
      box(
        p.x / p.z + 50,
        p.size.y / 3 / p.z + 60,
        p.size.x / p.z,
        p.size.y / p.z
      ).isColliding.char.a
    ) {
      const ty = p.size.y / 3 / p.z + 60 - p.size.y / p.z / 2;
      if (vy > 0) {
        play("laser");
        vy = -2.5 * sqrt(difficulty);
        if (pos.y > ty) {
          pos.y = ty;
        }
        hops++;
      }
      addScore(multiplier, p.x / p.z + 50, ty);
      if (p.color === "yellow") {
        play("select");
        multiplier++;
      }
      return false;
    }
    p.z -= difficulty * 0.2;
    return p.z > 1;
  });
}