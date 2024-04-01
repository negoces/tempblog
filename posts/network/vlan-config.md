# VLAN 交换机配置探究

入手了个杂牌交换机，没有所谓的 Access、Trunk、Hybrid 端口，只有 tagged、untagged 两个选项，故对部分国产交换机的 VLAN 行为做个探究

## TL;DR

```txt
端口接收:
    tagged:
        若 [数据包 VLAN ID] 为 [空]: [数据包 VLAN ID] 改写为 [VID]
        若 [数据包 VLAN ID] 在 [端口 VLAN ID] 中: [数据包 VLAN ID] 不变
        若 [数据包 VLAN ID] 不在 [端口 VLAN ID] 中: 丢弃
    untagged:
        [数据包 VLAN ID] 改写为 [VID]
内部路由:
    数据包送到所有 [端口 VLAN ID] [VID] 包含 [数据包 VLAN ID] 的端口
端口发送:
    tagged:
        若 [数据包 VLAN ID] 为 [VID]: [数据包 VLAN ID] 改写为 [空]
        若 [数据包 VLAN ID] 为 [端口 VLAN ID]: [数据包 VLAN ID] 不变
    untagged:
        [数据包 VLAN ID] 改写为 [空]
```

## 实验时注意事项

### 加载内核模块

```bash
sudo modprobe 8021q && lsmod | grep 8021q
```

### 在接口上附加和删除 IP

```bash
sudo ip addr add dev eth0 192.168.211.1/24
sudo ip addr del dev eth0 192.168.211.1/24
```

### 创建和删除 VLAN 接口

```bash
sudo ip link add link eth0 name eth0.10 type vlan id 10
sudo ip link del dev eth0.10
```

### 启用和关闭链路

```bash
sudo ip link set dev eth0.10 up
sudo ip link set dev eth0.10 down
```

### 关闭某端口的 IP 转发

```bash
sudo sysctl -w net.ipv4.conf.eth0/10.forwarding=0
```

## 部分实验结果

### 双方均设置 VLAN 接口，交换机不同模式的连接情况

| Host A | Host B | 连通状况 |
| :----: | :----: | :------: |
|  tag   |  tag   |    通    |
| untag  | untag  |   不通   |
|  tag   | untag  |   不通   |
| untag  |  tag   |   不通   |
