//
//  Badge.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/19/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import SwiftUI

struct Badge: View {
    
    enum BadgeType {
        case
        danger,
        warning,
        success,
        none
        
        func getBackgroundColor() -> Color {
            switch self {
            case .danger:
                return Color.badgeVariantDangerBackgroundColor
            case .warning:
                return Color.badgeVariantWarningBackgroundColor
            case .success:
                return Color.badgeVariantSuccessBackgroundColor
            case .none:
                return Color.badgeBackgroundColor
            }
        }
        
        func getForegroundColor() -> Color {
            switch self {
            case .danger:
                return Color.badgeVariantDangerColor
            case .warning:
                return Color.badgeVariantWarningColor
            case .success:
                return Color.badgeVariantSuccessColor
            case .none:
                return Color.badgeColor
            }
        }
    }
    
    var text: String = ""
    var type: BadgeType = .none
    
    public var body: some View {
        HStack {
            Text(text).foregroundColor(type.getForegroundColor())
        }
        .padding(.vertical, 5)
        .padding(.horizontal, 10)
        .background(type.getBackgroundColor())
        .cornerRadius(20)
    }
}

struct BadgesView: View {
    var body: some View {
        VStack(spacing: 10) {
            Badge(text: "default")
            Badge(text: "danger", type: .danger)
            Badge(text: "warning", type: .warning)
            Badge(text: "success", type: .success)
        }
        .navigationBarTitle("Badges")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
        .edgesIgnoringSafeArea(.all)
    }
}

struct Badge_Previews: PreviewProvider {
    static var previews: some View {
        BadgesView()
    }
}
