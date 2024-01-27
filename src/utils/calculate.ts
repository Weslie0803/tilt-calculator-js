import * as math from "mathjs"
import { TiltData } from "./types"

const theta_angle_rad = (direction: any, z_axis: any, x_axis: any) => {
    const y_axis = math.cross(z_axis, x_axis)
    const a = math.dot(direction, x_axis)
    const b = math.dot(direction, y_axis)
    const theta = math.acos(a)
    if (typeof theta === "number")
        return theta
    else
        return theta.re
}

const x_matrix = (hkl: any, uvw: any, ab: any) => {
    const uvw_prim = math.cross(hkl, uvw)
    const x = math.matrix(math.zeros([3,3]))
    const x0 = math.subtract(math.multiply(uvw, ab[0]), math.multiply(uvw_prim, ab[1]))
    const x1 = math.add(math.multiply(uvw, ab[1]), math.multiply(uvw_prim, ab[0]))
    x.subset(math.index(0, [0,1,2]), x0)
    x.subset(math.index(1, [0,1,2]), x1)
    x.subset(math.index(2, [0,1,2]), hkl)
    return math.matrix(x)
}

const matrix_A = (alpha: number) => {
    return math.matrix([
        [math.cos(alpha), 0, -math.sin(alpha)],
        [0, 1, 0],
        [math.sin(alpha), 0, math.cos(alpha)]
    ])
}

const matrix_B = (beta: number) => {
    return math.matrix([
        [1, 0, 0],
        [0, math.cos(beta), -math.sin(beta)],
        [0, math.sin(beta), math.cos(beta)]
    ])
}

const U_matrix = (a:math.Matrix, b: math.Matrix, x: math.Matrix) => {
    const ab = math.multiply(a, b)
    return math.multiply(math.transpose(ab), x)
}

const normalize = (vec: any) => {
    const length = math.norm(vec, 2)
    return math.multiply(vec, 1/math.number(length))
}

const almost_equal = (a: math.Matrix, b: math.Matrix, threshold: number) : boolean=> {
    const sub = math.subtract(a, b)
    const distance = math.norm(sub, 2)
    if (math.number(distance) < threshold) return true
    else return false
}

const ab_from_matrix = (ab_mat: math.Matrix, threshold: number): [number, number] => {
    const alpha = -math.asin(ab_mat.get([0,2]))
    const beta =  math.asin(ab_mat.get([2,1]))
    const check_matrix = math.multiply(matrix_A(alpha), matrix_B(beta))
    if (almost_equal(ab_mat, check_matrix, threshold))
        return [alpha, beta]
    else {
        console.log("Error data!")
        return [114514, 114514]
    }
}

/* const x_matrix = (
    h: number,
    k: number,
    l: number, 
    u: number,
    v: number,
    w: number, 
    theta: number) => {
    const uvw_prim = math.cross([h,k,l], [u,v,w])
    const up = uvw_prim[math.index(0)]
    const x = math.matrix([
        math.multiply(uvw, ab[0]),
        math.subtract(math.multiply(uvw, ab[0]), math.multiply(uvw_prim, ab[1])),
    ])

} */

const deg2rad = (deg: number): number => {
    return deg * math.pi / 180
}

const rad2deg = (rad: number) => {
    return rad / math.pi * 180
}

export const calculate = (data: TiltData) => {
    const hkl1 = normalize([data.h1, data.k1, data.l1])
    const hkl2 = normalize([data.h2, data.k2, data.l2])
    const uvw = normalize(math.cross(hkl1, hkl2))

    const theta = deg2rad(data.rotate_theta) + theta_angle_rad(uvw, hkl1, [1,0,0])
    const ab = [math.cos(theta), math.sin(theta)]
    
    const x1 = x_matrix(hkl1, uvw, ab)
    
    const alpha1 = deg2rad(data.alpha1)
    const beta1 = deg2rad(data.beta1)
    const a1 = matrix_A(alpha1)
    const b1 = matrix_B(beta1)
    const u = U_matrix(a1, b1, x1)

    const x2 = x_matrix(hkl2, uvw, ab)
    const AB2 = math.multiply(x2, math.transpose(u))
    const [alpha2, beta2] = ab_from_matrix(AB2, 1e-2)
    return [rad2deg(alpha2), rad2deg(beta2)]
}
