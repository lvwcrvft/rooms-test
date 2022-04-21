import React, { FC, useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IRoomInterface } from "../types/room.interface";
import RoomStore from "../stores/roomStore";
import { observer } from "mobx-react-lite";
import './AppStyles.css'
import { SearchOutlined } from '@ant-design/icons';
import { ReservationModal } from "./ReservationModal";

export const TableComponent: FC = observer(() => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<IRoomInterface[]>();
    const [filteredItems, setFilteredItems] = useState<IRoomInterface[]>();
    const [showModal, setShowModal] = useState<[boolean, number | null]>([
        false,
        null,
    ]);
    const [showFilter, setShowModalFilter] = useState(false);

    const columns: ColumnsType<IRoomInterface> = [
        {
            title: "Номер",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Цена (руб.)",
            dataIndex: "cost",
            key: "cost",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <>
                        <Input className="filter-field"
                            type='number'
                            autoFocus
                            placeholder="Цена"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.valueAsNumber ? [e.target.valueAsNumber] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => { confirm() }}
                            onBlur={() => { confirm() }}>
                        </Input>
                    </>
                )
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, room) => {
                return room.cost === value
            }
        },
        {
            title: "Количество мест",
            dataIndex: "info",
            key: "info",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <>
                        <Input
                            type='number'
                            autoFocus
                            placeholder="Количество мест"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.valueAsNumber ? [e.target.valueAsNumber] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => { confirm() }}
                            onBlur={() => { confirm() }}>
                        </Input>
                    </>
                )
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, room) => {
                return room.info == value
            }
        },
        {
            title: "",
            render: (room: IRoomInterface) => (
                <Button className='reserve-button' type="primary" onClick={() => setShowModal([true, room.id])}>
                    Забронировать
                </Button>
            ),
        }
    ];
    const submitHandler = async (itemId: number) => {
        setShowModal([false, null]);
        await RoomStore.reserveRooms(itemId);
        await RoomStore.getRooms();
    };
    useEffect(() => {
        RoomStore.getRooms();
    }, []);
    useEffect(() => {
        setItems(RoomStore.roomData);
        setFilteredItems(RoomStore.roomData.filter((item) => !item.reserveStatus));
    }, [RoomStore.roomData]);
    return (
        <><ReservationModal
            visible={showModal[0]}
            itemId={showModal[1]}
            onSubmit={submitHandler}
            onCancel={() => setShowModal([false, null])}
        />
            <Table className="table"
                rowKey={(item) => item.id}
                loading={loading}
                dataSource={filteredItems}
                columns={columns}
            />
        </>
    );
});
