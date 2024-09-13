// screens/games/shooting/ShootingGameScreen.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, PanResponder } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// Define your game objects
const Player = (props) => {
  const { body, size } = props;
  const { position } = body;
  const { width, height } = size;

  return (
    <View
      style={[
        styles.player,
        {
          width: width,
          height: height,
          transform: [
            { translateX: position.x - width / 2 },
            { translateY: position.y - height / 2 }
          ]
        }
      ]}
    />
  );
};

const Bullet = (props) => {
  const { body, size } = props;
  const { position } = body;
  const { width, height } = size;

  return (
    <View
      style={[
        styles.bullet,
        {
          width: width,
          height: height,
          transform: [
            { translateX: position.x - width / 2 },
            { translateY: position.y - height / 2 }
          ]
        }
      ]}
    />
  );
};

const Target = (props) => {
  const { body, size } = props;
  const { position } = body;
  const { width, height } = size;

  return (
    <View
      style={[
        styles.target,
        {
          width: width,
          height: height,
          transform: [
            { translateX: position.x - width / 2 },
            { translateY: position.y - height / 2 }
          ]
        }
      ]}
    />
  );
};

const ShootingGameScreen = () => {
  const engine = useRef(Matter.Engine.create()).current;
  const world = engine.world;

  // Create and add game objects to the world
  const [entities, setEntities] = React.useState(() => {
    const player = Matter.Bodies.rectangle(200, 400, 50, 50);
    const target = Matter.Bodies.rectangle(300, 100, 50, 50);
    const bullet = Matter.Bodies.rectangle(0, 0, 10, 10);

    Matter.World.add(world, [player, target, bullet]);

    return {
      player: { body: player, size: { width: 50, height: 50 } },
      target: { body: target, size: { width: 50, height: 50 } },
      bullet: { body: bullet, size: { width: 10, height: 10 } }
    };
  });

  // Add PanResponder to control player movement
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        Matter.Body.setPosition(entities.player.body, {
          x: gestureState.moveX,
          y: entities.player.body.position.y
        });
      }
    })
  ).current;

  useEffect(() => {
    // Update game loop
    const update = () => {
      Matter.Engine.update(engine);
      setEntities((prev) => ({
        ...prev,
        player: { ...prev.player, body: prev.player.body },
        target: { ...prev.target, body: prev.target.body },
        bullet: { ...prev.bullet, body: prev.bullet.body }
      }));
    };

    const interval = setInterval(update, 1000 / 60);
    return () => clearInterval(interval);
  }, [engine]);

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.gameEngine}
        systems={[]}
        entities={entities}
      >
        <Player {...entities.player} />
        <Target {...entities.target} />
        <Bullet {...entities.bullet} />
      </GameEngine>
      <View {...panResponder.panHandlers} style={styles.panResponder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameEngine: {
    flex: 1,
  },
  player: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
  bullet: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  target: {
    position: 'absolute',
    backgroundColor: 'green',
  },
  panResponder: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default ShootingGameScreen;