import { configure, makeAutoObservable } from "mobx";
import { IRoomInterface } from "../types/room.interface";

configure({ enforceActions: "observed" });

class RoomStore {
  constructor() {
    makeAutoObservable(this);
  }

  roomData: IRoomInterface[] = [];
  getRooms = async () => {
    fetch(
      "http://localhost:3000/rooms"
    )
      .then((response) => response.json())
      .then((data) => {
        this.roomData = data;
      });
  };
  reserveRooms = async (itemId: number) => {
    return new Promise((resolve, reject) => {
      fetch(
        "http://localhost:3000/rooms/" + itemId,
        {
          method: "PATCH",
          body: JSON.stringify({ "reserveStatus": true }),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }),
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };
}

export default new RoomStore();
