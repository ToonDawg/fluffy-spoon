import { useState } from "react";

//Types

type HanoiPole = {
  id: number;
  blocks: number[];
  selected: boolean;
};

const startingPoleState = [40, 70, 110];
const initialTowerState: HanoiPole[] = [
  { id: 1, blocks: [...startingPoleState], selected: false },
  { id: 2, blocks: [], selected: false },
  { id: 3, blocks: [], selected: false },
];

export const TowerOfHanoi = () => {
  const [poles, setPoles] = useState<HanoiPole[]>(initialTowerState);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleClick = (selectedPole: HanoiPole) => {
    const preSelectedPole = findPreSelectedPole(selectedPole);

    if (preSelectedPole) {
      handleBlockMovement(preSelectedPole, selectedPole);
    } else {
      togglePoleSelection(selectedPole);
    }
  };

  const findPreSelectedPole = (selectedPole: HanoiPole) => {
    return poles.find(
      (pole) => pole.selected === true && pole.id !== selectedPole.id
    );
  };

  const handleBlockMovement = (
    preSelectedPole: HanoiPole,
    selectedPole: HanoiPole
  ) => {
    if (preSelectedPole.blocks[0] > selectedPole.blocks[0]) {
      deselectPole(preSelectedPole);
      return;
    }

    const selectedBlock = preSelectedPole.blocks.shift();
    if (selectedBlock) selectedPole.blocks.unshift(selectedBlock);

    deselectPole(preSelectedPole);

    if (
      poles[poles.length - 1].blocks.join("") === startingPoleState.join("")
    ) {
      setHasWon(true);
    }
  };

  const deselectPole = (pole: HanoiPole) => {
    setPoles((prev) =>
      prev.map((p) => (p.id === pole.id ? { ...pole, selected: false } : p))
    );
  };

  const togglePoleSelection = (selectedPole: HanoiPole) => {
    setPoles((prev) =>
      prev.map((pole) =>
        pole.id === selectedPole.id
          ? { ...selectedPole, selected: !selectedPole.selected }
          : pole
      )
    );
  };

  console.log({ initialTowerState });

  const reset = () => {
    setHasWon(false);
    setPoles([
      { id: 1, blocks: [...startingPoleState], selected: false },
      { id: 2, blocks: [], selected: false },
      { id: 3, blocks: [], selected: false },
    ]);
    console.log("Reset");
  };

  return (
    <>
      <h2>Tower of Hanoi</h2>
      <div className="hanoi-container">
        {hasWon ? (
          <div className="has-won">
            <h1>Congratulations! You Win!</h1>
            <button type="button" onClick={reset}>
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="poles-container">
              {poles.map((pole: HanoiPole) => (
                <div
                  key={pole.id}
                  className="tower"
                  onClick={() => handleClick(pole)}
                >
                  <HanoiPole
                    id={pole.id}
                    blocks={pole.blocks}
                    selected={pole.selected}
                  />
                </div>
              ))}
            </div>

            <button type="button" onClick={reset}>
              Reset
            </button>
          </>
        )}
      </div>
    </>
  );
};

const HanoiPole = ({ blocks: pole, selected }: HanoiPole) => {
  return (
    <div className="pole">
      {pole.map((block: number, index: number) => (
        <HanoiBlock
          key={index}
          width={block}
          selected={selected && index === 0}
        />
      ))}
    </div>
  );
};

const HanoiBlock = ({
  width,
  selected,
}: {
  width: number;
  selected: boolean;
}) => {
  return (
    <div
      className="block"
      style={{ width: width, border: selected ? "solid green 3px" : "" }}
    ></div>
  );
};


//Blockers - to use the spread operator to make a shallow copy. Referencing directly caused the array to change
//Even though its a const

//Doing a Deep copy for initialTowerState was too time consuming to set up so I duplicated the code on reset.

//When starting the project I had state in the other components. I realised that this was more of a hassle as the poles
// had to interact with each other from a higher component.