import clamp from '../utils/clamp';

function playerMovement(object) {
  let h_move = object.input.right.isDown - object.input.left.isDown;
  let v_move = object.input.down.isDown - object.input.up.isDown;

  object.h_speed += h_move * object.player_acceleration;
  object.h_speed = clamp(object.h_speed, -200, 200);
  object.v_speed += v_move * object.player_acceleration;
  object.v_speed = clamp(object.v_speed, -200, 200);

  if (h_move == 0) {
    if (Math.abs(object.h_speed) < 5) {
      object.h_speed = 0;
    } else {
      object.h_speed *= 0.95;
    }
  }

  if (v_move == 0) {
    if (Math.abs(object.v_speed) < 5) {
      object.v_speed = 0;
    } else {
      object.v_speed *= 0.95;
    }
  }

  object.x += object.h_speed / 60;
  object.y += object.v_speed / 60;
}

export { playerMovement };
